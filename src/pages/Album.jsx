import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

import { getMyAlbum } from '../services/albumService';
import {useAuth} from '../contexts/authContext';
import Card from '../components/Card';
import { updateCard,deleteCard } from '../services/albumService';

function Album(){
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    const {user, loading : userloading} = useAuth();
    const [mode, setMode] = useState('normal'); // 수정을 위해 수정모드, 일반 모드 생성

    const onDeleteCard = async (id) => {
        try {
            await deleteCard( id );
            setCards(cards.filter(prev => prev.id !== id));
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

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

            <div className="flex justify-end items-center" >
                <div id="updateMode" 
                    className="w-25 mr-10 mt-5 p-1.5 
                                text-center text-blue-500 
                                border border-blue-500 shadow-md  rounded-xl
                                hover:bg-[#3ba4fa] hover:text-white cursor-pointer"
                    onClick={()=>{setMode(mode === 'normal' ? 'update' : 'normal'); console.log("modeChanged",mode);}}>
                    {mode === 'normal' ? '수정모드' : '일반모드'}
                </div>
            </div>
            

            <div id="option_bar" className="m-[8vh] mt-[6vh] flex justify-between items-center">
                <div id="sort" className="">
                    <select className="w-25 bg-white shadow-sm p-1.5">
                        <option value="number">번호순</option>
                        <option value="name">이름순</option>
                    </select>
                </div>
                <div id="filter" className="">
                    <select className="w-25 bg-white shadow-sm p-1.5">
                        <option value="all">전체</option>
                        <option value="fire">불꽃</option>
                        <option value="water">물</option>
                        <option value="grass">풀</option>
                    </select>
                </div>
            </div>


            <div className="container mx-auto m-4">
                <div className="grid grid-cols-6 gap-4">
                    {
                        cards.map((card)=>(
                            <Card key={card.id} {...card} mode={mode} onDeleteCard={onDeleteCard} onUpdateCard={onUpdateCard} />
                        ))
                    }
                </div>
            </div>

            <div id="insertLink">
                <Link to="/insert" 
                    className="fixed bottom-[20vh] right-[20vh] w-24 h-24 
                                bg-blue-500 text-6xl text-white
                                flex justify-center items-center
                                rounded-full shadow-lg 
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