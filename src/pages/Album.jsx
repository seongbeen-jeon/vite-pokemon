import {useState, useEffect,useMemo} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import { getMyAlbum } from '../services/albumService';
import {useAuth} from '../contexts/authContext';
import {saveAlbumChanges} from '../services/albumService';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';

function Album(){
    const navigate = useNavigate(); 

    const [loading, setLoading] = useState(true);
    const {user, loading : userloading} = useAuth();

    const [mode, setMode] = useState('normal'); // 수정을 위해 수정모드, 일반 모드 생성

    const [myAlbum, setMyAlbum] = useState([]); // 내 앨범 원본 데이터

    const [keyword, setKeyword] = useState("");
    const [searchedKeyword,setSearchedKeyword] = useState("");

    const [isOpenFilterOption, setIsOpenFilterOption] = useState(false);

    const rarityGroup = {// 필터용
                LOW : ["C", "U", "R", "RR","RRR", "temp"],
                AR : ["AR","A","K"],
                SR : ["SR","ACE","MA"],
                SAR : ["SAR"],
                UR : ["UR", "MUR"],
                PROMO : ["PROMO"],
            }
    const rarityOption = ["LOW","AR","SR","SAR","UR","PROMO"];
    const [checkedRarity, setCheckedRarity] = useState(rarityOption); 

    const typeOption = ["pokemon", "non-pokemon"];
    const [checkedType, setCheckedType] = useState(typeOption);

    const languageOption = ["KOR", "JPN" , "ENG"];
    const [checkedLanguage, setCheckedLanguage] = useState(languageOption);

    const gradeGroup = {
        "Single" : null,
        "PSA10" : [10],
        "PSA 9,8,7" : [9,8,7],
        "PSA ~6" : [6,5,4,3,2,1],
    };
    const gradeOption = ["Single", "PSA10", "PSA 9,8,7", "PSA ~6"];
    const [checkedGrade, setCheckedGrade] = useState(gradeOption);

    const [sortOption, setSortOption] = useState("title");

    const [pendingUpdates, setPendingUpdates] = useState({});
    const [pendingDeletes, setPendingDeletes] = useState([]);
    

    {/* 앨범 데이터 받아오기 */}
    const fetchMyAlbum = async () =>{
        try{
            const data = await getMyAlbum();
            setMyAlbum(data);
            return true;
        }catch(error){
            console.error("앨범 데이터 조회 실패 : ",error);
            return false;
        }
    }

    {/* 검색 */}
    const onChange = (e)=>{
        setKeyword(e.target.value);
    }

    const onSearch = ()=>{
        setSearchedKeyword(keyword.trim().toLowerCase());
    }

    {/* 정렬 */}
    const onSort = (e)=>{
        setSortOption(e.target.value);
    }

    

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

    const handleCheckLanguage = (e)=>{
        const targetLanguage = e.target.value;
        
        setCheckedLanguage(
            (prev)=>{
                if(prev.includes(targetLanguage)){
                    return prev.filter((language)=> language !== targetLanguage );
                }
                return [...prev, targetLanguage];
            }
        );
    }

    const handleCheckGrade = (e)=>{
        const targetGrade = e.target.value;

        setCheckedGrade(
            (prev)=>{
                if(prev.includes(targetGrade)){
                    return prev.filter((grade)=> grade !== targetGrade);
                }
                return [...prev, targetGrade];
            }
        );
    }

    {/* 검색, 필터, 정렬 통합 */}
    const visibleCards = useMemo(()=>{
        
        let result = myAlbum;
        
        {/* 검색 */}
        if(searchedKeyword !== ""){
            if(searchedKeyword.includes("/")){//카드 식별 코드로 검색할 때
                const [setCode, cardNum] = searchedKeyword.split("/");

                result = myAlbum.filter((card)=>card.cards.set_code?.toLowerCase() === setCode && card.cards.card_no === cardNum);
            }else{ // 카드 이름으로 검색할 때


                result = myAlbum.filter((card)=>card.cards.title?.toLowerCase().includes(searchedKeyword));
            }
            
            if(result.length === 0) { //둘 다 아니면 box 이름으로 검색했는지 확인
                result = myAlbum.filter((card)=>card.cards.pack_name.includes(searchedKeyword));
            }
        
        }
        
        {/* 필터 */}
        result = result.filter((card)=>{
            
            const matchedType = checkedType.includes(card.cards.card_type);
            const matchedRarity = checkedRarity.some((rarity)=>
                rarityGroup[rarity]?.includes(card.cards.rarity)
            );
            const matchedLanguage = checkedLanguage.includes(card.language);
            const matchedGrade = checkedGrade.some((grade)=>
                gradeGroup[grade]?.includes(card.grade) || (grade ==="Single" && card.grade === null)
            );
            return matchedType && matchedRarity && matchedLanguage && matchedGrade;
        });
        
        {/* 정렬 */}
        if(sortOption === "title"){
            return [...result].sort((a,b)=>a.cards.title.localeCompare(b.cards.title, 'ko'));
        } else if (sortOption === "dex_number"){
            return [...result].sort((a,b)=>{ 
                if(a.cards.dex_no === null) return 1; // 포켓몬 카드가 아닌 경우는 맨 뒤로 보낸다
                if(b.cards.dex_no === null) return -1;
                return a.cards.dex_no - b.cards.dex_no});
        }
        
        return result;
    },[
        myAlbum,
        searchedKeyword,
        checkedRarity,
        checkedType,
        checkedLanguage,
        checkedGrade,
        sortOption,
    ]);
    

    {/* 수정모드 - 삭제 */}
    const onDeleteCard = (id)=>{
        setPendingDeletes(prev=>{
            if(prev.includes(id)){
                return prev.filter( item => item !== id)
            }

            return prev.includes(id)? prev : [...prev,id]
            }
        );
        setPendingUpdates(prev=>{
            const next = {...prev};
            delete next[id];
            return next;
        });
    };

    {/* 수정모드 - 변경 */}
    const onUpdateCard = ({id, quantity, language, grade})=>{
        setPendingUpdates(prev=>({
            ...prev,
            [id] : {"quantity" : quantity, "language" : language, "grade" : grade}
        }));
    };

    const handleUpdatesSubmit = async ()=>{
        const success = await saveAlbumChanges({pendingDeletes, pendingUpdates});

        const refreshed = await fetchMyAlbum();

        if(refreshed){
            setPendingDeletes([]);
            setPendingUpdates({});

            if(!success){
                alert("수정에 실패했습니다");
                return ;
            }

            alert("수정 완료!");
        }else{
            alert("수정은 완료 되었으나, 앨범 데이터를 새로 불러오지 못했습니다. 새로고침을 해주세요");
        }
    }


    useEffect(()=>{

        if(userloading) return;

        if(!user){
            alert("로그인이 필요합니다.");
            navigate('/signin',{replace : true});
            return ;
        }

        const getAlbum = async ()=>{
            try{
                await fetchMyAlbum();
            }finally{
                setLoading(false);
            }
        };
        
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

            {/* 수정모드 진입 버튼 */}
            <div id="modeChange" className="flex justify-end items-center" >
                <div id="updateMode" 
                    className="w-25 mr-10 mt-5 p-1.5 
                                text-center text-blue-500 
                                border border-blue-500 shadow-md  rounded-xl
                                hover:bg-[#3ba4fa] hover:text-white cursor-pointer"
                    onClick={()=>{setMode(mode === 'normal' ? 'update' : 'normal')}}>
                    {mode === 'normal' ? 
                        <div>수정모드</div>
                        : 
                        <div onClick={handleUpdatesSubmit}>완료</div>}
                </div>
            </div>
            
            {/* 검색 바 */}
            <div id="searchBar" className="w-[70%] mx-auto my-10">
                <SearchBar value={keyword} onChange={onChange} onSearch={onSearch}/>
            </div>

        <div id="Option" className="m-[1rem] mt-[2rem] flex justify-between items-center">
            {/* 정렬 */}
           <div id="sort" className="">
                <select className="w-[8rem] bg-white shadow-md p-[0.5rem]" onChange={onSort}>
                    <option >정렬</option>
                    <option value="dex_number" >도감번호</option>
                    <option value="title" >이름</option>
                </select>
            </div>

            {/* 필터 */}
            <div id="filter" className="w-[30rem] bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 mb-6">
                {/* 헤더 타이틀 */}
                <div className="flex items-center justify-between gap-[1rem] pb-3 border-b border-slate-100 text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                        </svg>
                        <span>필터 옵션</span>
                    </div>
                    
                    {/* 2. 토글 버튼 클릭 시 상태 반전 */}
                    <button 
                        onClick={() => setIsOpenFilterOption(!isOpenFilterOption)}
                        className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors bg-slate-100 px-2.5 py-1 rounded-lg"
                    >
                        <span>{isOpenFilterOption ? "접기" : "펼치기"}</span>
                        {/* 3. 상태에 따라 화살표 방향 회전 */}
                        <svg 
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpenFilterOption ? "rotate-180" : ""}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                </div>
                {/* 필터 창 On */}
                {isOpenFilterOption &&(
                    <div className="space-y-3 text-sm w-min-[10rem]">
                    {/* 1. 분류 필터 */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-slate-400 w-16">분류</span>
                        <fieldset className="flex flex-wrap gap-1.5">
                            {typeOption.map((type) => {
                                const isChecked = checkedType.includes(type);
                                return (
                                    <label 
                                        key={type} 
                                        className={`cursor-pointer inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                                            isChecked 
                                                ? "bg-indigo-200 text-indigo-700 border-indigo-200 shadow-2xs" 
                                                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                                        }`}
                                    >
                                        <input type="checkbox" className="sr-only" 
                                            value={type} 
                                            checked={isChecked}
                                            onChange={handleCheckType}
                                        />
                                        {type}
                                    </label>
                                );
                            })}
                        </fieldset>
                    </div>

                    {/* 2. 등급 필터 */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-slate-400 w-16">등급</span>
                        <fieldset className="flex flex-wrap gap-1.5">
                            {rarityOption.map((rarity) => {
                                const isChecked = checkedRarity.includes(rarity);
                                return (
                                    <label 
                                        key={rarity} 
                                        className={`cursor-pointer inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                                            isChecked 
                                                ? "bg-indigo-200 text-indigo-700 border-indigo-200 shadow-2xs" 
                                                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                                        }`}
                                    >
                                        <input type="checkbox" className="sr-only" 
                                            value={rarity} 
                                            checked={isChecked}
                                            onChange={handleCheckRarity}
                                        />
                                        {rarity}
                                    </label>
                                );
                            })}
                        </fieldset>
                    </div>

                    {/* 3. 언어 필터 */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-slate-400 w-16">언어</span>
                        <fieldset className="flex flex-wrap gap-1.5">
                            {languageOption.map((language) => {
                                const isChecked = checkedLanguage.includes(language);
                                return (
                                    <label 
                                        key={language} 
                                        className={`cursor-pointer inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                                            isChecked 
                                                ? "bg-indigo-200 text-indigo-700 border-indigo-200 shadow-2xs" 
                                                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                                        }`}
                                    >
                                        <input type="checkbox" className="sr-only" 
                                            value={language} 
                                            checked={isChecked}
                                            onChange={handleCheckLanguage}
                                        />
                                        {language}
                                    </label>
                                );
                            })}
                        </fieldset>
                    </div>
                    
                    {/* 등급 필터 */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium text-slate-400 w-16">분류</span>
                        <fieldset className="flex flex-wrap gap-1.5">
                            {gradeOption.map((grade) => {
                                const isChecked = checkedGrade.includes(grade);
                                return (
                                    <label 
                                        key={grade} 
                                        className={`cursor-pointer inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                                            isChecked 
                                                ? "bg-indigo-200 text-indigo-700 border-indigo-200 shadow-2xs" 
                                                : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                                        }`}
                                    >
                                        <input type="checkbox" className="sr-only" 
                                            value={grade} 
                                            checked={isChecked}
                                            onChange={handleCheckGrade}
                                        />
                                        {grade}
                                    </label>
                                );
                            })}
                        </fieldset>
                    </div>
                </div>)}
            </div>
        </div>


            <div id="container" className="mx-auto m-[2rem]">
                <div className="grid mx-[1rem] grid-cols-4 gap-[1rem] lg:grid-cols-6 lg:gap-[1rem]">
                    {
                        visibleCards.map((card)=>{
                            const displayCard = {
                                ...card,
                                quantity :
                                    pendingUpdates[card.id]?.quantity ?? card.quantity,
                                language :
                                    pendingUpdates[card.id]?.language ?? card.language,
                                isUpdated :
                                    pendingUpdates[card.id] ? true : false,
                                isDeleted :
                                    pendingDeletes.includes(card.id) ? true : false,
                                grade :
                                    pendingUpdates[card.id]?.grade ?? card.grade,
                            }
                            return (
                                <Card 
                                    key={card.id} 
                                    card={displayCard} 
                                    mode={mode} 
                                    onDeleteCard={onDeleteCard} 
                                    onUpdateCard={onUpdateCard}
                                />);
                        })
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