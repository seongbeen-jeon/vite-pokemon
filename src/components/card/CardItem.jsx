import {Link} from 'react-router-dom';
import {useState} from 'react';

export default function CardItem({card}){
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return(
    <>
        <Link to={`/cards/${card.id}`}>
            <div className="relative aspect-[3/4] w-full mx-[1rem]">
                {!isLoaded && !hasError && (
                    <div className="absolute inset-0 animate-pulse bg-gray-200" />
                )}

                {hasError ? (
                    <div className="flex flex-cols items-center justify-center">
                        <div className="flex h-full items-center justify-center">
                            이미지 없음
                        </div>
                        <div id="namaTag" className="text-sm text-bold">
                            No.{card.cardNo} {card.title}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <div className="m-[1rem] w-full">
                            <img 
                                className="h-full w-full object-contain" 
                                src={card.image_path} 
                                alt={card.title} 
                                loading="lazy" 
                                decoding="async"
                                onLoad={()=>setIsLoaded(true)}
                                onError={()=>setHasError(true)} />
                        </div>
                        <div id="namaTag" className="text-md">
                            No.{card.card_no} {card.title}
                        </div>
                    </div>
                )}
                
            </div>
        </Link>
        
    </>
    )
}