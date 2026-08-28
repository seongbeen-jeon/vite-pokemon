import {supabase} from "../lib/supabase.js";
import {normalizeKeyword} from "../util/filter.js";

export async function getBoxes({code, keyword}={}) {
    let query = supabase.from("boxes").select("*");

    if(code){
        query = query.ilike("set_code", code);
    }

    if(keyword){
        const normalizedKeyword = normalizeKeyword(keyword);
        query = query.ilike("name", `「%${normalizedKeyword}%`);
    }

    //박스 수 제한
    query.limit(60);

    const {data, error} = await query;

    if(error){
        throw error;
    }

    return data;
}