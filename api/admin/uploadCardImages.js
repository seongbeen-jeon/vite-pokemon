import {formidable} from "formidable";
import fs from "fs/promises";

import {r2, PutObjectCommand} from "../../lib/server/r2.js";
import adminMiddleware from "./middleware/adminMiddleware.js";

//cards Image
function createR2Key(fileName){ // file의 이름을 통해 R2에 넣을 이름을 만든다 ex : S12_001.wepb -> S/S12/S12_001.webp
    const setCode = fileName.split("_")[0];
    const series = setCode.match(/[A-Z]/g)?.join("") ?? "";

    return `${series}/${setCode}/${fileName}`;
}

async function uploadToR2({file,key,contentType}){ //이미지를 업로드 하는 함수
    const command = new PutObjectCommand({
        Bucket : process.env.R2_BUCKET_NAME,
        Key : key,
        Body : file,
        ContentType : contentType,
    });

    const result = await r2.send(command);

    return result;
}

export default async function cardsImageHandler(req,res){
    const isAdmin = await adminMiddleware(req);
    if(!isAdmin) {
        return res.status(403).json({
            message : "관리자 권한이 없습니다.",
        });
    }

    if(req.method !== "POST"){
        return res.status(405).json({
            message : "Method Not Allowed",
        });
    }

    try{
        const form = formidable({
            multiples: true,
         });
        const [fields, files] = await form.parse(req);

        if(files.images.length === 0){
            return res.status(400).json({
                message : "이미지가 없습니다",
            });
        }

        await Promise.all( //chunk 단위로 오는 파일들을 병렬적으로 upload
            files.images.map(async (file)=>{

                // if(file.name.split(".") !== "webp"){
                //     throw new Error("확장자가 webp가 아닙니다.");
                // }
            

                const key = createR2Key(file.originalFilename);
                const buffer = await fs.readFile(file.filepath); //file의 실제 데이터를 읽어와서 buffer로 변환

                return uploadToR2({
                    file : buffer,
                    key : key,
                    contentType : file.mimetype,
                });
            })
        )

        /* 하나씩 upload -> 나중에 시간 체크해서 성능 개선에 사용
        //이미지 이름 가공 및 업로드
        for(const file of files){
            const key = createR2Key(file.name);

            //CloudFlare에 업로드
            await uploadToR2({
                file : await file.arrayBuffer(),
                key : key,
                contentType : file.type,
            });
        }
        */
        console.log("이미지 업로드 완료");

        return res.status(200).json({
            message : "Data inserted successfully",
        });    
    }catch(error){
        return res.status(500).json({
            message : error.message,
        });
    }   
}
