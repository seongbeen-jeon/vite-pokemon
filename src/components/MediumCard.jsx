import {Link} from "react-router-dom";

function MediumCard(){
    const option = {
        title: "피카츄",
        dex_number: "025",
        img_path :"",
    }

    return(
    <> 
        <div className="w-full bg-white border">
            <Link to={`/cards/SV8_132.png`}>
            <img src="../../assets/SV8_132.png" alt="pokecard"/>
            </Link>
        </div>
    </>
    );
}



export default MediumCard;