import {Link} from 'react-router-dom'

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

export default function Card({id, card_id, title, language, image_path,quantity,mode,onDeleteCard,onUpdateCard}){
    const languageOptions = ['KO', 'JP', 'EN'];

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

            {/*삭제 표시 */}
            {mode === "update" &&(
                <div className="">
                    <button className="absolute top-2 left-2 bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white rounded-md" onClick={() => onDeleteCard({id})}>
                        삭제
                    </button>
                </div>

                )
            }

            {/* 언어 표시 */}
            {/* normal 모드 */}
            <div className="absolute top-2 right-2 bg-white text-blue-600 px-1.5 py-0.8 rounded-md text-sm border border-blue-600 shadow">
                {language}
            </div>
            {/* update 모드 */}
            {mode==="update" && (                                                                       
                <div className="absolute top-2 right-2 bg-white text-blue-600 
                                px-1.5 py-0.8 rounded-md text-sm border border-blue-600
                                shadow-xl hover:bg-[#3ba4fa] hover:text-white cursor-pointer"
                                onClick={() => {onUpdateCard({id, quantity, language : languageOptions[(languageOptions.indexOf(language)+1)%languageOptions.length]})}}>
                    {language}
                </div>
            )}

            
            {/* 수량 표시 */}
            {/* normal 모드 : 수량이 2개 이상일 경우만 보인다. */}
            {mode==="normal" && quantity > 1 && 
                (<div className=" absolute bottom-2 left-1/2 -translate-x-1/2
                    flex items-center
                    w-auto
                    px-1.5 py-1

                    text-center text-blue-500
                    border border-blue-500
                    shadow-md rounded-xl
                    bg-white
                    ">
                {`X ${quantity}`}
            </div>)}

            {/* update 모드 */}
            {mode==="update" && (
                <div className=" absolute bottom-2 left-1/2 -translate-x-1/2
                    flex items-center
                    w-auto
                    px-1.5 py-1

                    text-center text-blue-500
                    border border-blue-500
                    shadow-md rounded-xl
                    bg-white

                    hover:bg-[#3ba4fa]
                    hover:text-white
                ">
                    {quantity > 1 && (<button className=" w-6 h-6
                        flex items-center justify-center
                        font-bold
                        rounded-lg
                        hover:bg-white/20"
                        onClick={() => onUpdateCard({id, quantity: quantity-1, language})}>
                        -
                    </button>)}

                    <span className="px-1 font-bold">
                        {`${quantity}`}
                    </span>

                    <button className=" w-6 h-6
                        flex items-center justify-center
                        font-bold
                        rounded-lg
                        hover:bg-white/20"
                        onClick={() => onUpdateCard({id, quantity: quantity+1, language})}>
                        +
                    </button>
            </div>)
            }


            
        </div>
        </>
    )
}