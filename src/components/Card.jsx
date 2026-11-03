import {Link} from 'react-router-dom'


export default function Card({card,mode,onDeleteCard,onUpdateCard}){
    const languageOptions = ['KO', 'JP', 'EN'];
    const {id,card_id,title,quantity,language,image_path,isUpdated,isDeleted} = card;

    //수정 예정인 카드를 표시
    const borderStyle = isDeleted ? "border-red-400" :
                            isUpdated ? " border-green-400" : "border-transparent";

    const deleteDisplay = "opacity-25";

    return(
        <>
        <div className="relative">
            <Link to={`/cards/${card_id}`} key={id}>
                <div id="changeStatus" 
                    className = {`border border-4 rounded-xl ${borderStyle}`}
                >
                    <img
                        src={image_path}
                        alt={title}
                        className={`w-full ${isDeleted ? deleteDisplay : ""}`}
                    />
                </div>
            </Link>

            {/*삭제 표시 */}
            {mode === "update" &&(
                <div className="">
                    <button className="absolute top-2 left-2 bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white rounded-md" onClick={() => onDeleteCard(id)}>
                        {!isDeleted ? <span>삭제</span> : <span>삭제취소</span>}
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