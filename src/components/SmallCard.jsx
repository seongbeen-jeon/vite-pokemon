import { Link } from "react-router-dom";


function SmallCard({id, img_path}) {

    return(
    <> 
        <div className="w-[100px] rounded-3xl shadow-sm">
            <Link to={`/cards/${id}`}>
                <img src={img_path} alt={id} className="w-full"/>
            </Link>
        </div>
    </>
    );
}



export default SmallCard;