import {Link} from 'react-router-dom';
import {useState} from 'react';

export default function Card({card,mode,onDeleteCard,onUpdateCard}){
    const languageOptions = ['KOR', 'JPN', 'ENG'];
    const {id,card_id,title,quantity,language,image_path,isUpdated,isDeleted, grade} = card;

    //수정 예정인 카드를 표시
    const borderStyle = isDeleted ? "border-red-400" :
                            isUpdated ? " border-green-400" : "border-transparent";

    const deleteDisplay = "opacity-25";

    const packName = card.cards.pack_name.match(/「(.*?)」/)?.[1];

    const [isOpenGradeOption, setIsOpenGradeOption] = useState(false);
    const gradeOption = ["10","9","8","7","6","5","4","3","2","1","Single"];
    const onClickGradeOption = () => {
        setIsOpenGradeOption(!isOpenGradeOption);
    }
    const handleGradeOptionClick = ({id,quantity, language, grade}) => {
        onUpdateCard({id, quantity, language, grade});
        setIsOpenGradeOption(false);
    }
    

    return(
        <>
        <div className="relative">
            <div id="changeStatus" className = {`border border-4 rounded-2xl ${borderStyle}`}>
                <div className="
                    relative w-full aspect-[3/4]
                    flex flex-col items-center
                    border border-gray-300 rounded-xl
                    py-[1rem]
                ">
                    <Link to={`/cards/${card_id}`} key={id} className="w-full flex justify-center items-center">
                        {/* 카드 이미지 */}
                        <img
                            src={image_path}
                            alt={title}
                            className={`mt-[0.5rem] w-[80%] ${isDeleted ? deleteDisplay : ""}`}
                        />
                    </Link>

                    {/* 팩 이름 + 카드 이름 */}
                    <div className="w-full mt-3 text-center">
                        <div className="text-xs text-gray-500">
                            {packName}
                        </div>

                        <div className="text-sm font-semibold mt-1">
                            No.{card.cards.card_no} {card.cards.title}
                        </div>
                    </div>

                    {/* 수량 영역 */}
                    <div className="w-full mt-[0.8rem]">
                        {/* normal 모드 : 수량이 2개 이상일 경우만 보인다. */}
                        {mode==="normal" && quantity > 1 && 
                            (<div className=" absolute bottom-[0.1rem] left-1/2 -translate-x-1/2
                                flex items-center
                                w-auto
                                px-[0.5rem] py-[0.1rem]
                                text-center text-blue-500 text-xs
                                border border-blue-500
                                shadow-md rounded-xl
                                bg-white
                                ">
                            {`X ${quantity}`}
                        </div>)}

                        {/* update 모드 */}
                        {mode==="update" && (
                            <div className=" absolute bottom-[0.1rem] left-1/2 -translate-x-1/2
                                flex items-center
                                w-auto
                                px-[0.5rem]
                                text-center text-blue-500 text-md
                                border border-blue-500
                                shadow-md rounded-xl
                                bg-white

                                hover:bg-[#3ba4fa]
                                hover:text-white
                            ">
                                {quantity > 1 && (<button className="
                                    px-[0.1rem] py-[0.1rem]
                                    flex items-center justify-center
                                    font-bold
                                    rounded-lg
                                    hover:bg-white/20"
                                    onClick={() => onUpdateCard({id, quantity: quantity-1, language, grade})}>
                                    -
                                </button>)}

                                <span className="px-1 text-sm">
                                    {`${quantity}`}
                                </span>

                                <button className="
                                    px-[0.1rem] py-[0.1rem]
                                    flex items-center justify-center
                                    font-bold
                                    rounded-lg
                                    hover:bg-white/20"
                                    onClick={() => onUpdateCard({id, quantity: quantity+1, language, grade})}>
                                    +
                                </button>
                        </div>)}
                    </div>
                </div>
                
            </div>
            

            {/*삭제 표시 */}
            {mode === "update" &&(
                <div className="">
                    <button className=" absolute top-2 right-3 
                                        bg-white 
                                        text-red-500 text-xs 
                                        border border-red-500 rounded-xl
                                        hover:bg-red-500 hover:text-white
                                        px-[0.2rem]
                                        " onClick={() => onDeleteCard(id)}>
                        {!isDeleted ? <span>삭제</span> : <span>삭제취소</span>}
                    </button>
                </div>

                )
            }

            {/* 언어 표시 */}
            {/* normal 모드 */}
            <div className="absolute top-2 left-[1rem] bg-white text-blue-400 text-xs px-[0.5rem] rounded-md text-sm border border-blue-600 rounded-xl shadow">
                {language}
            </div>
            {/* update 모드 */}
            {mode==="update" && (                                                                       
                <div className="absolute top-2 left-[1rem] bg-white text-blue-400 text-xs px-[0.5rem] rounded-md text-sm border border-blue-600 rounded-xl
                                shadow-2xl hover:bg-[#3ba4fa] hover:text-white cursor-pointer"
                                onClick={() => {onUpdateCard({id, quantity, language : languageOptions[(languageOptions.indexOf(language)+1)%languageOptions.length], grade})}}>
                    {language}
                </div>
            )}

            {/* 등급 표시 */}
            {/* normal 모드 */}
            {grade && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-400 text-white text-xs px-[0.5rem] rounded-md text-sm border border-red-600 rounded-xl shadow">
                PSA {grade}
            </div>)
            }

            {/* update 모드 */}
            {mode==="update" && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-400 text-white text-xs px-[0.5rem] rounded-md text-sm border border-red-600 rounded-xl shadow">
                <button onClick={onClickGradeOption} className="cursor-pointer">PSA {grade}</button>
            </div>)
            }
            {mode==="update" && isOpenGradeOption && (
            <div className="absolute top-[2rem] left-1/2 -translate-x-1/2 bg-red-50 px-[0.5rem] rounded-md text-sm border border-red-600 rounded-xl shadow">
                <div className="flex flex-col gap-1">
                {gradeOption.map((option) => (
                    <button 
                        key={option} 
                        onClick={() => handleGradeOptionClick({id,quantity, language, grade : option === "Single" ? null : parseInt(option)})}
                        className="cursor-pointer border-b border-gray-300">
                        {option === "Single" ? "등급 없음" : `${option}`}
                    </button>
                ))}
                </div>
            </div>
            )}
            
            
        </div>
        </>
    )
}