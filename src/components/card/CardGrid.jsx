import CardItem from './CardItem.jsx';

export function Cardgrid({cards}){
    return(
        <>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-[1rem]">
                {cards.map((card)=>
                    <CardItem key={card.id} card={card} />
                )}
            </div>
        </>
    )
}
