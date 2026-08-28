import {supabase} from "../lib/supabase.js";
import {normalizeKeyword} from "../util/filter.js";

export async function getCards({id,set_code, dexNo, keyword, limit}={}) {
    let query = supabase.from("cards").select("*");

    if(id){
        query = query.eq("id", id);
    }

    if(set_code){
        query = query.eq("set_code", set_code);
    }

    if(dexNo){
        query = query.eq("dexNo", dexNo);
    }

    if(keyword){
        const normalizedKeyword = normalizeKeyword(keyword);
        query = query.ilike("name", `%${normalizedKeyword}%`);
    }
    
    if(limit){
        query = query.limit(limit);
    }

    
    const {data, error} = await query;
    if(error){ //query error
        throw error;
    }
    return data;
}

export async function getRelatedCards(card, limit=6) {
    console.log(card);

    const { data, error } = await supabase.rpc("get_related_cards", {
    target_id: card.id,
    target_dex_no: card.dex_no,
    result_limit: limit,
  });

  if (error) {
    throw error;
  }

  return data;
}