import {useState, useEffect} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';

import MediumCard from '../components/MediumCard';
import { getMyAlbum } from '../services/albumService';
import { getCards } from '../services/cardService';
import {useAuth} from '../contexts/authContext';
import Card from '../components/Card';

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

function Album(){
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    const {user, loading : userloading} = useAuth();

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
            <div id="option_bar" className="m-[10vh] flex justify-between items-center">
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
                            <Card key={card.id} {...card} />
                        ))
                    }
                </div>
            </div>
        </div> 
        </>
    );
    }
}

export default Album;