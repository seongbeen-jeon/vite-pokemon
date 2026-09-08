import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import SmallCard from "../components/smallCard";
import {getCards, getRelatedCards} from "../services/cardService.js";
import { insertCard } from "../services/albumService.js";

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

function CardDetail() {
    const {cardId} = useParams();
    const [card, setCard] = useState({});
    const [relatedCards, setRelatedCards] = useState([]);

    useEffect(()=>{
        async function getCardDetail(){
            try{
                const data = await getCards({id:cardId});
                const relatedCardsdata = await getRelatedCards({card : data[0], limit : 6});

                setCard(data[0]);
                
                setRelatedCards(relatedCardsdata);
            
            }catch(error){
                console.error("fetch Card error : ",error);
            }
        }
        getCardDetail();
    },[cardId]);


    return(
        <>
        <div id="container" className="w-[70%] mt-20 m-auto">
            <div id ="cardDetail" className="flex">
                <div className="card-image w-[360px] mr-20 ">
                    <img src={card.image_path} alt={cardId} className="w-full"/>
                </div>
                <div className="card-info w-1/2 p-8">
                    <h1 className="text-2xl font-bold mb-4">{card.title}</h1>
                    <p className="mb-2">도감번호 : {card.dex_no}</p>
                    <p className="mb-2">일러스트레이터 : {card.illustrator}</p>
                    <p className="mb-2">팩 : {card.pack_name}</p>
                    <p className="mb-2">일본판 이름 : {card.title}</p>
                    <p className="mb-2">영판 이름  : {card.title}</p>
                    <div id="insertBtn" className="w-full">
                        <button className="p-3 bg-white rounded-xl shadow-sm hover:bg-gray-50 cursor-pointer" onClick={()=>{insertCard({cardId}); alert("앨범에 추가 되었습니다")}}>앨범에 추가하기</button>
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