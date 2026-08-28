import {supabase} from "../lib/supabase.js";

export async function getPokemon ({dexNo, name}={}){
    let query = supabase.from("pokemon").select("*");

    if(dexNo){
        query = query.eq("dexNo", dexNo);
    }

    if(name){
        query = query.in("name", name);
    }

    const {data, error} = await query;

    if(error){
        throw error;
    }

    return data;
}
