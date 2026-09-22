import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import { getMyAlbum } from '../services/albumService';
import {useAuth} from '../contexts/authContext';
import { updateCard,deleteCard } from '../services/albumService';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';

function Album(){
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    const {user, loading : userloading} = useAuth();
    const [mode, setMode] = useState('normal'); // 수정을 위해 수정모드, 일반 모드 생성
    const [keyword, setKeyword] = useState("");
    const [myAlbum, setMyAlbum] = useState([]); // 내 앨범내 검색용 카드 저장공간

    const rarityOption = ["LOW","AR","SR","SAR","UR","PROMO"];
    const [checkedRarity, setCheckedRarity] = useState(rarityOption); 

    const typeOption = ["pokemon", "trainers"];
    const [checkedType, setCheckedType] = useState(typeOption);
    
    const [sortOption, setSortOption] = useState("title");

    
    {/* 검색 */}
    const onChange = (e)=>{
        setKeyword(e.target.value);
    }

    const onSearch = ()=>{
        const trimmedKeyword = keyword.trim();
        let result = [];

        if(trimmedKeyword.includes('/')) { //카드 식별 코드로 검색할 때
            const [setCode, cardNum] = trimmedKeyword.split('/');
            result = myAlbum.filter((card)=>card.cards.set_code === setCode && card.cards.card_no === cardNum);
        }
        
        else{ // 카드 이름으로 검색할 때
            result = myAlbum.filter((card)=>card.cards.title.includes(trimmedKeyword));
        }
        
        if(result.length === 0) { //box 이름으로 검색할 때
            result = myAlbum.filter((card)=>card.cards.pack_name.includes(trimmedKeyword));
        }
        console.log("result : ", result);
        setCards(result);
    }

    {/* 정렬 */}
    const onSort = (e)=>{
        setSortOption(e.target.value);
        return ;
    }

    const sortCards = (cardstoSort)=>{
        if(sortOption === "title"){
            return [...cardstoSort].sort((a,b)=>a.cards.title.localeCompare(b.cards.title, 'ko'));
        } else if (sortOption === "dex_number"){
            return [...cardstoSort].sort((a,b)=>{ 
                if(a.cards.dex_no === null) return 1; // 포켓몬 카드가 아닌 경우는 맨 뒤로 보낸다
                if(b.cards.dex_no === null) return -1;
                return a.cards.dex_no - b.cards.dex_no});
        }
    }

    useEffect(()=>{
        setCards((prevCards)=>sortCards(prevCards));
    },[sortOption]);


    {/* 필터 */}
    useEffect(()=>{
        const rarityGroup = {// 필터용
                LOW : ["C", "U", "R", "RR","RRR"],
                AR : ["AR","A","K"],
                SR : ["SR","ACE","MA"],
                SAR : ["SAR"],
                UR : ["UR", "MUR"],
                PROMO : ["PROMO"],
            }

        const filteredCards = myAlbum.filter((card)=>{
            const matchedType = checkedType.includes(card.cards.card_type);
            const matchedRarity = checkedRarity.some((rarity)=>
                rarityGroup[rarity].includes(card.cards.rarity)
            )

            return matchedType && matchedRarity;
        });

        setCards(sortCards(filteredCards));
        
    },[checkedRarity,checkedType,myAlbum]);


    

    const handleCheckRarity = (e)=>{
        const targetRarity = e.target.value;

        setCheckedRarity((prev)=>{
            if(checkedRarity.includes(targetRarity)){
                return prev.filter((rarity)=>rarity !== targetRarity);
            }
            return [...prev, targetRarity];
        });
    }

    const handleCheckType = (e)=>{
        const targetType = e.target.value;

        setCheckedType(
            (prev)=>{
                if(prev.includes(targetType)){
                    return prev.filter((type)=> type !== targetType );
                }
                return [...prev, targetType];
            }
        );
    }

    {/* 수정모드 - 삭제 */}
    const onDeleteCard = async (id) => {
        try {
            await deleteCard( id );
            setCards(cards.filter(prev => prev.id !== id));
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    {/* 수정모드 - 변경 */}
    const onUpdateCard = async({id, quantity, language}) => {
        try{
            console.log("onUpdateCard called with:", {id, quantity, language});
            await updateCard({id, quantity, language});
            setCards(prevCards => prevCards.map(card =>
                card.id === id ? { ...card, quantity, language } : card
            ));
        }catch(error){
            console.error("Error updating card:", error);
        }
    };



    useEffect(()=>{

        if(userloading) return;

        if(!user){
            alert("로그인이 필요합니다.");
            navigate('/signin',{replace : true});
            return ;
        }

        async function getAlbum(){
            try{
                const getMyAlbumData = await getMyAlbum();

                setMyAlbum(getMyAlbumData);
                setCards(getMyAlbumData);
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        }

        getAlbum();
    },[user,userloading, navigate]);

    if(loading){
        return(
            <div>loading ... </div>
        );
    }else{
        return(
        <>
        <div id="body" className="w-full">

            <div id="modeChange" className="flex justify-end items-center" >
                <div id="updateMode" 
                    className="w-25 mr-10 mt-5 p-1.5 
                                text-center text-blue-500 
                                border border-blue-500 shadow-md  rounded-xl
                                hover:bg-[#3ba4fa] hover:text-white cursor-pointer"
                    onClick={()=>{setMode(mode === 'normal' ? 'update' : 'normal'); console.log("modeChanged",mode);}}>
                    {mode === 'normal' ? '수정모드' : '일반모드'}
                </div>
            </div>
            
            <div id="searchBar" className="w-[70%] mx-auto my-10">
                <SearchBar value={keyword} onChange={onChange} onSearch={onSearch}/>
            </div>
           

            <div id="option_bar" className="m-[1rem] mt-[2rem] flex justify-between items-center">
                <div id="sort" className="">
                    <select className="w-[8rem] bg-white shadow-md p-[0.5rem]" onChange={onSort}>
                        <option >정렬</option>
                        <option value="dex_number" >도감번호</option>
                        <option value="title" >이름</option>
                    </select>
                </div>
                <div id="filter" className="flex flex-col items-start">
                    <fieldset>
                        {typeOption.map((type)=>(
                            <label key={type} className="mr-[1rem]">
                                <input type="checkbox" className="pr-1" 
                                    value={type} 
                                    checked={checkedType.includes(type)}
                                    onChange={handleCheckType}
                                />
                                {type==="pokemon" ? "포켓몬" : "트레이너"}
                            </label>
                        ))}
                    </fieldset>

                    <fieldset className="mt-4">
                        {rarityOption.map((rarity)=>(
                            <label key={rarity} className="mr-4">
                                <input type="checkbox" className="pr-1" 
                                    value={rarity} 
                                    checked={checkedRarity.includes(rarity)}
                                    onChange={handleCheckRarity}
                                />
                                {rarity}
                            </label>
                        ))}
                    </fieldset>
                </div>
            </div>


            <div id="container" className="mx-auto m-[2rem]">
                <div className="grid mx-[1rem] grid-cols-4 gap-[1rem] lg:grid-cols-6 lg:gap-[1rem]">
                    {
                        cards.map((card)=>(
                            <Card key={card.id} {...card} mode={mode} onDeleteCard={onDeleteCard} onUpdateCard={onUpdateCard} />
                        ))
                    }
                </div>
            </div>

            <div id="insertLink">
                <Link to="/insert" 
                    className="fixed bottom-[10vh] right-[10vh] w-24 h-24 
                                bg-blue-500 text-6xl text-white
                                flex justify-center items-center
                                rounded-full shadow-xl 
                                hover:bg-blue-600">
                    <span className="leading-none  -translate-y-2">+</span>
                </Link>
            </div>
        </div> 
        </>
    );
    }
}

export default Album;