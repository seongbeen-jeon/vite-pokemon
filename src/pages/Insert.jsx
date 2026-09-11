import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from '../contexts/authContext';
import { getCards } from "../services/cardService";
import { insertCard } from "../services/albumService.js";
import CardSearchResult from "../components/CardSearchResult.jsx";
import CardPendingListItem from "../components/CardPendingListItem.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function Insert(){
    const {user, loading : userloading} = useAuth();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [pendingCards, setPendingCards] = useState([]);


    const onChange = (e)=>{
        setKeyword(e.target.value);
    }

    //카드를 검색하는 함수
    //키워드 가공, getCards 호출, 결과를 searchResults에 저장
    const onSearch = async (e)=>{

        const trimmedKeyword = keyword.trim();
        let getCardsData = [];

        if(trimmedKeyword === ""){
            alert("검색어를 입력해주세요.");
            return;
        }

        if(trimmedKeyword.includes("/")){ //카드가 코드로 검색 될 때
            const [set_code, card_no] = trimmedKeyword.split("/");

            getCardsData = await getCards({set_code, card_no : parseInt(card_no)});
        }else{//카드가 이름으로 검색 될 때
            getCardsData = await getCards({keyword : trimmedKeyword});
        }

        if(getCardsData.length === 0){ // 검색 결과 X
            alert("검색 결과가 없습니다.");
        }else if(getCardsData.length === 1){ // 검색 결과가 1개일 때, 바로 등록할 카드 목록에 추가
            addToPendingCards(getCardsData[0]);
        }else{
            setSearchResults(getCardsData);
        }
    }

    const addToPendingCards = (card) => { 
        if(pendingCards.some((c) => c.id === card.id)) { //동일 카드가 이미 등록되어 있을 때
            alert("이미 등록할 카드 목록에 존재합니다.");
        } else {
            setPendingCards((prev) => [...prev, {...card, quantity: 1, language : "KO"}]);
            setSearchResults([]);//검색 결과 초기화
        }
    };

    const onUpdatePendingCard = ({cardId, newQuantity, newLanguage}) => {
        setPendingCards((prev)=>
            prev.map((card) => card.id === cardId ? {...card, quantity: newQuantity, language: newLanguage} : card)
        );
    }

    const onDeletePendingCard = (cardId) =>{
        setPendingCards(pendingCards.filter((card) => card.id !== cardId));
    }

    useEffect(()=>{
        //로그인 여부 확인
        if(userloading) return;
        if(!user){
            alert("로그인이 필요합니다.");
            navigate('/signin',{replace : true});
            return ;
        }

    },[user, userloading, navigate]);

    return(
        <>
        <div id="container" className="w-[70%] m-auto h-full pt-20 shadow-lg border-1">
            
            <SearchBar value={keyword} onChange={onChange} onSearch={onSearch}/>

            <div id="viewContainer" className="w-[80%] mx-auto h-full pt-10 ">
                {/* 검색 결과 */}
                <div id="searchResultContainer" className="w-full h-full p-5 mx-auto">
                    <div className="text-sm bold">
                        검색결과
                    </div>
                    <div className="">
                        {searchResults ? searchResults.map((card)=>
                            <CardSearchResult key={card.id} card={card} onClick={addToPendingCards} />
                        ) : <div>검색 결과가 없습니다.</div>}
                    </div>

                </div>
                
                {/* 추가할 항목 */}
                <div id="pendingCardContainer" className="w-full h-full p-5 mx-auto">
                    <div className="text-sm bold">
                        등록할 카드 목록
                    </div>
                    <div>
                        {pendingCards ? pendingCards.map((card)=>
                            <CardPendingListItem key={card.id} card={card} onDelete={onDeletePendingCard} onUpdate={onUpdatePendingCard}/>
                        ) : <div></div>}
                    </div>
                </div>
            </div>
        
        
            <div id="insertButton" className="flex jusity-center items-center">
                <button className="w-40 mx-auto my-10 p-5
                                text-center text-blue-500 text-l
                                border border-blue-500 shadow-md  rounded-xl
                                hover:bg-[#3ba4fa] hover:text-white"
                        onClick={()=>{
                            insertCard({cardList : pendingCards});
                            navigate('/album',{});
                        }}
                >
                    추가하기
                </button>
                
            </div>

        </div>
        </>
    );
}