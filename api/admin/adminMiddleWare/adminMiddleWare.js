import { supabase } from "../../../lib/server/supabase.js";

export default async function adminMiddleWare(req,res){
    const authHeader = req.headers.authorization;

    if(!authHeader?.startWith("Bearer ")){
        return res.status(401).json({
            message : "로그인이 필요합니다",
        });
    }

    const token = authHeader.split(" ")[1];

    const {data : {user}, error : userError} = await supabase.auth.getUser(token);

    if(userError || !user){
        return res.status(401).json({
            message : "유효하지 않은 사용자입니다.",
        });
    }

    const {data : userinfo, error : adminError} = await supabase
        .from(users)
        .select("role")
        .eq("id", user.id)
        .single();
    
    if(adminError || userinfo?.role !=="admin"){
        return res.status(403).json({
            message : "관리자 권한이 없습니다",
        });
    }
    
    return user;
}