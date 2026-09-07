export default function CardSearchResult({card,onClick}) {

    return(
        <>
        <div className="flex items-center
                        w-full h-20 p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer" 
                        onClick={()=>onClick(card)}>
            <div>
                <img className="h-18" src={card.image_path} alt={card.title} />
            </div>
            <div id="cardInfo" className="text-sm ml-10">
                <div id="pack_name">{card.pack_name}</div>
                <div id="cardtitle">{card.title}</div>
                <div id="cardrarity">{card.rarity}</div>
            </div>
        </div>
        </>
    );
}