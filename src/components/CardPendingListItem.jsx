export default function CardPendingListItem({ card, onDelete,onUpdate }) {
    const languageOption = ["KO", "EN", "JP"];

    return(
        <>
        <div className="flex justify-between items-center w-full h-20 p-4 border-b border-gray-300 text-sm" >
            <div>
                <img className="h-18" src={card.image_path} alt={card.title}></img>
            </div>

            <div>
                <div>{card.pack_name}</div>
                <div>{card.title}</div>
                <div>{card.rarity}</div>
            </div>

            <div className="flex justify-center items-center gap-4">
                <div id="quantity" className="flex flex-col">
                    <button id="add" className="hover:bg-gray-100 cursor-pointer" onClick={()=>{
                        onUpdate({cardId : card.id, newQuantity : card.quantity+1, newLanguage: card.language})
                    }}>
                        +
                    </button>
                    {card.quantity}
                    {
                        card.quantity > 1 ? <button id="subtract" className="hover:bg-gray-100 cursor-pointer" onClick={()=>{
                        onUpdate({cardId : card.id, newQuantity:card.quantity-1, newLanguage: card.language})
                    }}>
                        -
                    </button> : <div className="invisible">-</div>
                    }
                    
                </div>

                <button id="language" className="w-8 border rounded-md cursor-pointer hover:bg-gray-200"
                    onClick={()=>{
                        onUpdate({cardId: card.id, newQuantity : card.quantity ,newLanguage :languageOption[(languageOption.indexOf(card.language)+1)%languageOption.length] });
                    }}
                >{card.language}</button>

                <div id="delete" className="bg-gray-300 border border-gray-500 hover:bg-gray-400 rounded-md cursor-pointer px-1.5 py-0.4" onClick={()=>{onDelete(card.id)}}>x</div>
            </div>
        </div>
        </>
    );

}