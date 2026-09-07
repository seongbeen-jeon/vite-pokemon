import {supabase} from "../lib/supabase.js";
import {normalizeKeyword} from "../util/filter.js";

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

export async function getCards({id,idList,set_code, card_no, keyword, limit}={}) {
    let query = supabase.from("cards").select("*");

    if(id){
        query = query.eq("id", id);
    }
    
    if(idList?.length > 0){
        query = query.in('id',idList);
    }

    if(set_code){
        query = query.eq("set_code", set_code).order('card_no', { ascending: false });;
    }

    if(card_no){
        query = query.eq("card_no", card_no);
    }

    if(keyword){
        const normalizedKeyword = normalizeKeyword(keyword);
        query = query.ilike("title", `%${normalizedKeyword}%`);
    }
    
    if(limit){
        query = query.limit(limit);
    }

    
    const {data, error} = await query;
    if(error){ //query error
        throw error;
    }

    const newPathData = data.map((card)=>({
                    ...card,
                    image_path : card.image_path.startsWith("SV") ? `${IMG_BASE_URL}/SV/${card.image_path.split("_")[0]}/${card.image_path}.webp` 
                        : card.image_path.startsWith("S") ? `${IMG_BASE_URL}/S/${card.image_path.split("_")[0]}/${card.image_path}.webp`
                        : card.image_path.startsWith("M") ? `${IMG_BASE_URL}/MEGA/${card.image_path.split("_")[0]}/${card.image_path}.webp`
                        : card.image_path
                }));

    return newPathData;
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