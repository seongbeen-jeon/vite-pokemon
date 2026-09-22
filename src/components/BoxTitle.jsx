import { Link } from "react-router-dom";

function BoxTitle({box}){

    return(
        <Link className="w-full max-w-[180px] text-lg font-bold rounded-t-xl"  to={`/sets/${box.set_code}`}>
            <div 
                className="bg-cover bg-center bg-no-repeat aspect-7/12 w-auto h-auto"
                style={{ backgroundImage: `url(${box.image_path})` }}
            >
                
            </div>
            
        </Link>
    );
}

export default BoxTitle;