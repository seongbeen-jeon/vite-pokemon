import { Link } from "react-router-dom";

function BoxTitle({box}){
    return(
        <div className="w-full text-lg font-bold rounded-t-xl">
            <Link to={`/sets/${box.set_code}`}>
                <img className="w-50 h-auto object-contain" src={box.image_path} alt={box.name + " Logo"}></img>
            </Link>
        </div>
    );
}

export default BoxTitle;