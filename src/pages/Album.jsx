import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import MediumCard from '../components/MediumCard';
import { getMyAlbum } from '../services/albumService';
import { getCards } from '../services/cardService';

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

function Album(){
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(()=>{
        async function getAlbum(){
            const getMyAlbumData = await getMyAlbum();
            const idList = getMyAlbumData.map((card)=>card.card_id);
        
            const myCards = await getCards({idList});

            //imgPath 가공
            const newPathData = myCards.map((card)=>({
                ...card,
                image_path : card.image_path.startsWith("SV") ? `SV/${card.image_path.split("_")[0]}/${card.image_path}.webp` 
                    : card.image_path.startsWith("S") ? `S/${card.image_path.split("_")[0]}/${card.image_path}.webp`
                    : card.image_path.startsWith("M") ? `MEGA/${card.image_path.split("_")[0]}/${card.image_path}.webp`
                    : card.image_path
                }));

            setCards(newPathData);
            setLoading(false);
        }

        getAlbum();
    },[]);

    if(loading){
        return(
            <div>loading ... </div>
        );
    }else{
        return(
        <>
        <div id="body" className="w-full">
            <div id="option_bar" className="m-[10vh] flex justify-between items-center">
                <div id="sort" className="">
                    <select className="w-25 bg-white shadow-sm p-1.5">
                        <option value="number">번호순</option>
                        <option value="name">이름순</option>
                    </select>
                </div>
                <div id="filter" className="">
                    <select className="w-25 bg-white shadow-sm p-1.5">
                        <option value="all">전체</option>
                        <option value="fire">불꽃</option>
                        <option value="water">물</option>
                        <option value="grass">풀</option>
                    </select>
                </div>
            </div>


            <div className="container mx-auto m-4">
                <div className="grid grid-cols-6 gap-4">
                    {cards.map((card) => (
                        <Link to={`/cards/${card.id}`} key={card.id}>
                        <img
                            key={card.id}
                            src={`${IMG_BASE_URL}/${card.image_path}`}
                            alt={card.name}
                            className="w-full"
                        />
                        </Link>
                    ))}
                </div>
            </div>
        </div> 
        </>
    );
    }
}

export default Album;