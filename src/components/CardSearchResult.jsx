export default function CardSearchResult({card,onClick}) {

    return(
        <>
        <div className="flex justify-between items-center break-keep gap-[1rem]
                        w-full h-[full] p-2 lg:p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer" 
                        onClick={()=>onClick(card)}>
            <div>
                <img className="min-w-[6rem] h-[9rem]" src={card.image_path} alt={card.title} />
            </div>
            <div id="cardInfo" className="">
                <div id="pack_name">{card.pack_name}</div>
                <div id="cardtitle">{card.title}</div>
                <div id="cardrarity">{card.rarity}</div>
            </div>
            <div className="w-[59px] lg:w-[93px]"></div>
        </div>
        </>
    );
}