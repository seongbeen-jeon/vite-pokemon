import {r2} from "../../lib/server/r2";
import { supabase } from "../../lib/server/supabase";

//cards Data : json
export async function cardsDataHandler(req,res){
    if(req.method !== "POST"){
        return res.status(405).json({
            message : "Method Not Allowed",
        });
    }

    try{
        const data = req.body;

        if(!data){
            return res.status(400).json({
                message : "데이터가 없습니다",
            });
        }

        //Data 가공

        //DB Insert
        const {error} = await supabase
            .from("cards")
            .insert(data);

        if(error){
            return res.status(500).json({
                message : error.message,
            });
        }

        return res.status(200).json({
            message : "Data inserted successfully",
        });    
    }catch(error){
        return res.status(500).json({
            message : "서버 오류가 발생했습니다",
        });
    }
   
}

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

    return await r2.send(command);
}

export async function cardsImageHandler(req,res){
    if(req.method !== "POST"){
        return res.status(405).json({
            message : "Method Not Allowed",
        });
    }

    try{
        const formData = await req.formData();
        const files = formData.getAll("files");

        if(files.length === 0){
            return res.status(400).json({
                message : "이미지가 없습니다",
            });
        }

        await Promise.all( //chunk 단위로 오는 파일들을 병렬적으로 upload
            files.map(async (file)=>{

                if(!(file instanceof File)){
                    throw new Error("잘못된 파일입니다.");
                }

                if(file.name.split(".") !== "webp"){
                    throw new Error("확장자가 webp가 아닙니다.");
                }
            

                const key = createR2Key(file.name);
                const buffer = await file.arrayBuffer();

                return uploadToR2({
                    file : buffer,
                    key : key,
                    contentType : file.type,
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
        return res.status(200).json({
            message : "Data inserted successfully",
        });    
    }catch(error){
        return res.status(500).json({
            message : error instanceof Error ? error.message : "서버 오류가 발생했습니다."
        });
    }   
}
