import { supabase } from "../../lib/server/supabase";

// Pokemon Data : json
export async function BoxDataHandler(req,res){
    if(req.method !== "POST"){
        return res.status(405).json({
            message : "Method Not Allowed",
        });
    }

    try{
        const data = req.body;

        if(!data){
            return res.status(400).json({
                message : "데이터가 없습니다.",
            });
        }

        //data 가공 logic

        const {result , error} = supabase
            .from("boxes")
            .insert(data);

        if(error){ // DB insert에서 발생한 에러
            return res.status(500).json({
                message : error.message,
            });
        }

        return res.status(200).json({
            message : "Box data inserted successfully",
            data : result,
        });

    }catch(error){
        return res.status(500).json({
            message : "서버 오류가 발생했습니다."
        });
    }
}