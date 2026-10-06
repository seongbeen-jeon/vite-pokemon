import {formidable} from "formidable";
import fs from "fs/promises";

import { supabase } from "../../lib/server/supabase.js";

// Pokemon Data : multipart/form-data
export default async function BoxDataHandler(req,res){
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
                message : "데이터가 없습니다.",
            });
        }

        //data 가공 logic

        const { data: result, error:DBerror } = await supabase
            .from("pokemon")
            .insert(data);

        if(DBerror){ // DB insert에서 발생한 에러
            
            return res.status(500).json({
                message : DBerror.message,
            });
        }

        
        return res.status(200).json({
            message : "Pokemon data inserted successfully",
            data : result,
        });

    }catch(error){
    console.error("insertPokemon error:", error);

    return res.status(500).json({
        message : error.message,
    });
}
}