import {useParams} from 'react-router-dom';
import {getCards} from "../services/cardService.js";
import {useState, useEffect} from 'react';
import { Cardgrid } from '../components/card/CardGrid.jsx';

export default function BoxDetail() {
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
        <Cardgrid cards={cards}/>
    </div>
    </>
    )
}