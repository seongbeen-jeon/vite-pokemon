import {Link} from 'react-router-dom'

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

export default function Card({id, card_id, title, language, image_path,quantity}){
    return(
        <>
        <div className="relative">
            <Link to={`/cards/${card_id}`} key={id}>
                <img
                    src={`${IMG_BASE_URL}/${image_path}`}
                    alt={title}
                    className="w-full"
                />
            </Link>
            <div className="absolute top-2 right-2 bg-white text-blue-600 px-1.5 py-0.8 rounded-md text-sm font-bold shadow">
                {language}
            </div>
            
        
            {quantity > 1 ? 
                (<div className="absolute bottom-2 left-1/2 -translate-x-1/2
                            w-5 h-5
                            rounded-full
                            bg-white
                            flex items-center justify-center
                            text-blue-600
                            text-sm
                            font-bold
                            shadow
                            b-blue-600
            ">
                {`X${quantity}`}
            </div>) : <></>}
            
        </div>
        </>
    )
}