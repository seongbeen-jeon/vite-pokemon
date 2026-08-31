import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import SmallCard from "../components/smallCard";
import {getCards, getRelatedCards} from "../services/cardService.js";
import { insertCard } from "../services/albumService.js";

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

function CardDetail() {
    const {cardId} = useParams();
    /*
    카드 정보 가져오기
    */
    const [card, setCard] = useState({});
    const [relatedCards, setRelatedCards] = useState([]);

    useEffect(()=>{
        async function getCardDetail(){
            try{
                const data = await getCards({id:cardId});
                //image_path 가공
                (data[0].image_path = data[0].image_path.startsWith("SV") ? `SV/${data[0].image_path.split("_")[0]}/${data[0].image_path}.webp` 
                        : data[0].image_path.startsWith("S") ? `S/${data[0].image_path.split("_")[0]}/${data[0].image_path}.webp`
                        : data[0].image_path.startsWith("M") ? `MEGA/${data[0].image_path.split("_")[0]}/${data[0].image_path}.webp`
                        : data[0].image_path);

                const relatedCardsdata = await getRelatedCards(data[0], 6);

                //image_path 가공
                const newPathrelatedCards = relatedCardsdata.map((card)=>({
                    ...card,
                    image_path : card.image_path.startsWith("SV") ? `SV/${card.image_path.split("_")[0]}/${card.image_path}.webp` 
                        : card.image_path.startsWith("S") ? `S/${card.image_path.split("_")[0]}/${card.image_path}.webp`
                        : card.image_path.startsWith("M") ? `MEGA/${card.image_path.split("_")[0]}/${card.image_path}.webp`
                        : card.image_path
                }));

                setCard(data[0]);
                setRelatedCards(newPathrelatedCards);

                

            }catch(error){
                console.error("fetch Card error : ",error);
            }
        }
        getCardDetail();
    },[cardId]);


    return(
        <>
        <div className="container ">
            <div className="card-detail flex">
                <div className="card-image w-[360px]">
                    <img src={`${IMG_BASE_URL}/${card?.image_path}`} alt={cardId} className="w-full"/>
                </div>
                <div className="card-info w-1/2 p-8">
                    <h1 className="text-2xl font-bold mb-4">{card.title}</h1>
                    <p className="mb-2">도감번호 : {card.dex_no}</p>
                    <p className="mb-2">일러스트레이터 : {card.illustrator}</p>
                    <p className="mb-2">팩 : {card.pack_name}</p>
                    <p className="mb-2">일본판 이름 : {card.title}</p>
                    <p className="mb-2">영판 이름  : {card.title}</p>
                    <div id="insertBtn" className="w-full">
                        <button className="p-3 bg-white rounded-xl shadow-sm" onClick={()=>{insertCard({cardId})}}>앨범에 추가하기</button>
                    </div>
                </div>
                
            </div>
            
            <div className="extra-info m-5">
                <div>연관 카드</div>
                <div className="cardList flex m-4 gap-5">
                    {relatedCards.map((card) => (
                        <SmallCard key={card.id} id={card.id} img_path={card.image_path}/>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
    
}

export default CardDetail;