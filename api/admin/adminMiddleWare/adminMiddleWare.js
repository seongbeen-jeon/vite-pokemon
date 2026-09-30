import { supabase } from "../../../lib/server/supabase.js";

export default async function adminMiddleWare(req){
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer")){
        return false;
    }

    const token = authHeader.split(" ")[1];

    const {data : {user}, error : userError} = await supabase.auth.getUser(token);

    if(userError || !user){
        return false;
    }


    const {data : userinfo, error : adminError} = await supabase
        .from("userinfo")
        .select("role")
        .eq("id", user.id)
        .single(); 

    if(adminError || userinfo?.role !=="admin"){
        return false;
    }
    
    return true;
}