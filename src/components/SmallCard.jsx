import { Link } from "react-router-dom";

function SmallCard(){
    return(
    <> 
        <div className="w-[100px] rounded-3xl shadow-sm">
            <Link to={`/cards/M2_110.png`}>
                <img src="../../assets/M2_110.png" alt="pokecard"/>
            </Link>
        </div>
    </>
    );
}



export default SmallCard;