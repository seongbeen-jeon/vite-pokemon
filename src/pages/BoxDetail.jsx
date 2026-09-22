import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {getCards} from "../services/cardService.js";
import {useState, useEffect} from 'react';


function BoxDetail() {
    const set_Code = useParams().set_Code;
    const [cards, setCards] = useState([]);
    
    useEffect(()=>{
        async function getCardsList(){  
            try{
                const data = await getCards({set_code:set_Code});
            
                setCards(data);
            
            }catch(error){
                console.error("fetch Cards error : ",error);
            }
        }
        getCardsList();
        
    },[]);

    return(
    <>  
    <div id ="container" className="mx-auto m-[2rem]">
        <div className="grid mx-[1rem] grid-cols-4 gap-[1rem] lg:grid-cols-6 lg:gap-[1rem]">
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