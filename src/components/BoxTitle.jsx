import { Link } from "react-router-dom";

function BoxTitle(){
    return(
        <div className="w-full h-12 text-lg font-bold rounded-t-xl">
            <Link to="/sets/mega_dream">
                <img className="w-50 border"src="../../assets/mega_dream_logo.webp" alt="mega dream Logo"></img>
            </Link>
        </div>
    );
}

export default BoxTitle;