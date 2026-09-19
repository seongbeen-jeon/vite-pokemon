import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {getCards} from "../services/cardService.js";
import {useState, useEffect} from 'react';

//box 상세 페이지에서 카드가 몇 장 보일지 제한 / 테스트용 20장
const limit = 20;


function BoxDetail() {
    const set_Code = useParams().set_Code;
    const [cards, setCards] = useState([]);
    
    useEffect(()=>{
        async function getCardsList(){  
            try{
                const data = await getCards({set_code:set_Code, limit});
            
                setCards(data);
            
            }catch(error){
                console.error("fetch Cards error : ",error);
            }
        }
        getCardsList();
        
    },[]);

    return(
    <>  
    <div id ="container" className="mx-auto mt-10">
        <div className="grid grid-cols-6 gap-4">
            {cards.map((card) => (
                <Link to={`/cards/${card.id}`} key={card.id}>
                <img
                    key={card.id}
                    src={card.image_path}
                    alt={card.name}
                    className="w-full"
                />
                </Link>
            ))}
        </div>
    </div>
    </>
    )
}

export default BoxDetail;