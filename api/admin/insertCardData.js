import fs from "fs/promises";
import {formidable} from "formidable";

import { supabase } from "../../lib/server/supabase.js";
import adminMiddleware from "./middleware/adminMiddleware.js";

//cards Data : multipart/form-data
export default async function cardsDataHandler(req,res){

    const isAdmin = await adminMiddleware(req);
    if(!isAdmin) {
        return res.status(403).json({
            message : "관리자 권한이 없습니다.",
        });
    };

    if(req.method !== "POST"){
        return res.status(405).json({
            message : "Method Not Allowed",
        });
    }

    try{
        const form = formidable({});
        const [fields, files] = await form.parse(req);
        const file = files.file[0];

        const text = await fs.readFile(file.filepath, 'utf-8');
        const data = JSON.parse(text);

        if(!data){
            return res.status(400).json({
                message : "데이터가 없습니다",
            });
        }

        //DB Insert
        const {error : DBerror} = await supabase
            .from("cards")
            .insert(data);

        if(DBerror){
            return res.status(500).json({
                message : DBerror.message,
            });
        }

        return res.status(200).json({
            message : "Data inserted successfully",
        });    
    }catch(error){
        console.error("insertCards error:", error);

        return res.status(500).json({
            message : error.message,
        });
    }
}

