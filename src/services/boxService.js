import {supabase} from "../lib/supabase.js";
import {normalizeKeyword} from "../util/filter.js";

export async function getBoxes({code, keyword}={}) {
    let query = supabase.from("boxes").select("*").eq('category','확장팩');

    if(code){
        query = query.ilike("set_code", code);
    }

    if(keyword){
        const normalizedKeyword = normalizeKeyword(keyword);
        query = query.ilike("name", `「%${normalizedKeyword}%`);
    }

    //소드 실드 이후 박스들만 확인
    query.gt('release_date','2020-01-01').order('release_date',{ascending: false});

    const {data, error} = await query;

    if(error){
        throw error;
    }

    return data;
}