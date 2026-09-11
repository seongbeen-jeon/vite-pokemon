import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {getCards} from "../services/cardService.js";
import {useState, useEffect} from 'react';

//const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

//box 상세 페이지에서 카드가 몇 장 보일지 제한 / 테스트용 20장
const limit = 20;


function BoxDetail() {
    const set_Code = useParams().set_Code;
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
        async function getCardsList(){  
            try{
                const data = await getCards({set_code:set_Code, limit});
                
                /*//path data 가공
                const newPathData = data.map((card)=>({
                    ...card,
                    image_path : card.image_path.startsWith("SV") ? `SV/${card.image_path.split("_")[0]}/${card.image_path}.webp` 
                        : card.image_path.startsWith("S") ? `S/${card.image_path.split("_")[0]}/${card.image_path}.webp`
                        : card.image_path.startsWith("M") ? `MEGA/${card.image_path.split("_")[0]}/${card.image_path}.webp`
                        : card.image_path
                }));
                newPathData.map((card)=>{console.log ('cardid:', card.id)});*/

                console.log("box detail data : ",data);
                setCards(data);
            
            }catch(error){
                console.error("fetch Cards error : ",error);
            }finally{
                setLoading(false);
            }

        }
        getCardsList();
        
    },[]);
   

    /*
    *   
    기능 
    1.필터 추가하기
    */


    return(
    <>  
    <div id ="container" className="mx-auto m-4">
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