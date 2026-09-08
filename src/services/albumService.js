import {supabase} from  '../lib/supabase';

export async function getMyAlbum(){
    const {data,error} = await supabase.from('album').select(`id, card_id, language, quantity, cards(title, image_path)`);

    const newPathData = data.map((card)=>({
                    ...card,
                    title : card.cards.title,
                    image_path : card.cards.image_path.startsWith("SV") ? `SV/${card.cards.image_path.split("_")[0]}/${card.cards.image_path}.webp` 
                        : card.cards.image_path.startsWith("S") ? `S/${card.cards.image_path.split("_")[0]}/${card.cards.image_path}.webp`
                        : card.cards.image_path.startsWith("M") ? `MEGA/${card.cards.image_path.split("_")[0]}/${card.cards.image_path}.webp`
                        : card.cards.image_path
                    }));

    if(error){
        console.error(error);
    }
    return newPathData;
}

export async function insertCard({cardId, cardList}){
    let query = supabase.from('album');
    let insertData = {};
      
    if(cardId){
        insertData ={ card_id : cardId };
    }
    if(cardList){
        insertData = cardList.map((card)=>(
            {
                card_id : card.id,
                quantity : card.quantity,
                language : card.language,
            })
        );
    }

    const {error} = await query.insert(insertData);

    if(error){
        console.error(error);
    }
    return ;
}

export async function selectCards({cardId, cardIdList, name}){
    let query = supabase.from('album').select('*');
    if(id){
        query = query.eq('card_id',cardId);
    }

    if(idList){ //카드 id 값을 통한 검색 (단일 검색, 박스 검색)
        query = query.in('card_id', cardIdList);
    }

    if(name){ //카드 이름을 통한 검색
        query = query.in('name', name)
    }

    const {data, error} = await query;
    if(error){
        console.error(error);
    }
    return data;

}

export async function updateCard({id, quantity, language}){
    const query = supabase.from('album')
        .update({
            quantity : quantity,
            language : language,
        })
        .eq('id', id);

    const {data,error} = await query;
    if(error){
        console.error(error);
    }
    return data;
}

export async function deleteCard(id){
    const query = supabase.from('album').delete().eq('id', id);
    const {data,error} = await query;
    if(error){
        console.error(error);
    }
    return data;
} 

