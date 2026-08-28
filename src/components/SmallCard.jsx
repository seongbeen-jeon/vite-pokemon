import { Link } from "react-router-dom";
const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;


function SmallCard({id, img_path}) {
    
    console.log("id :", id,'img_path : ', img_path);

    return(
    <> 
        <div className="w-[100px] rounded-3xl shadow-sm">
            <Link to={`/cards/${id}`}>
                <img src={`${IMG_BASE_URL}/${img_path}`} alt={id} className="w-full"/>
            </Link>
        </div>
    </>
    );
}



export default SmallCard;