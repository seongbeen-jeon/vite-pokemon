import {useParams} from "react-router-dom";
import SmallCard from "../components/smallCard";

function CardDetail() {
    const {cardid} = useParams();
    /*
    카드 정보 가져오기
    */
    
    return(
        <>
        <div className="container ">
            <div className="card-detail flex">
                <div className="card-image w-[360px]">
                    <img src={`../../assets/M2a/${cardid}`} alt={cardid} className="w-full"/>
                </div>
                <div className="card-info w-1/2 p-8">
                    <h1 className="text-2xl font-bold mb-4">{cardid}</h1>
                    <p className="mb-2">카드 설명</p>
                    <p className="mb-2">카드 속성</p>
                    <p className="mb-2">카드 능력치</p>
                </div>
            </div>
            <div className="extra-info m-5">
                <div>연관 카드</div>
                <div className="cardList flex m-4 gap-5">
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                </div>

                <div>같은 박스 다른 카드</div>
                <div className="cardList flex m-4 gap-5">
                    <SmallCard />
                    <SmallCard />
                    <SmallCard />
                </div>
            </div>
        </div>
        </>
    );
    
}

export default CardDetail;