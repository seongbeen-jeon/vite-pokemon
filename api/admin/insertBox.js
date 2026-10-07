import { supabase } from "../../lib/server/supabase.js";
import adminMiddleware from "./middleware/adminMiddleware.js";

// Box Data : json
export default async function BoxDataHandler(req,res){
    

    {/* 테스트 환경에서 CORS 회피용 */}
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    

    // 브라우저의 CORS preflight 요청 처리
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }


    {/* admin 검증 */}
    const isAdmin = await adminMiddleware(req);
    if(!isAdmin) {
        return res.status(403).json({
            message : "관리자 권한이 없습니다.",
        });
    };



    {/* method 검증 */}
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

        const {data : result , error} = await supabase
            .from("boxes")
            .insert(data)
            .select()
            .single();
        

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