import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "../contexts/authContext";
import BoxForm from "../components/admin/BoxForm";
import CardForm from "../components/admin/CardForm";
import PokemonForm from "../components/admin/CardForm";



export default function Admin(){
    const {user,loading : userloading} = useAuth();
    const navigate = useNavigate();
    
    const [activeMenu, setActiveMenu] = useState("box");

    {/* Admin 페이지 접근 검증 */}
    useEffect(()=>{
        if(userloading) return;

        if(!user || user.userinfo?.role !== "admin"){
            alert("로그인 하지 않았거나, 관리자가 아닙니다.");
            navigate('/',{replace : true});
            return;
        }
    },[user,userloading,navigate]);

    //insert box logic

    //insert cards logic

    //insert pokemon logic

    return (
        <>
        <div id="body" className="w-full">
            <div id="container" className="w-[90%] min-h-screen grid grid-cols-10 mx-auto border border-1">
                <aside className="col-span-2 border-r border-gray-200">
                    <div className="w-[95%] mx-auto p-[0.5rem] text-md font-normal cursor-pointer rounded-lg hover:bg-gray-100"
                        onClick={()=>setActiveMenu("box")}
                    >
                        박스 추가하기
                    </div>
                    <div className="w-[95%] mx-auto p-[0.5rem] text-md font-normal cursor-pointer rounded-lg hover:bg-gray-100"
                        onClick={()=>setActiveMenu("card")}
                    >
                        카드 추가하기
                    </div>
                    <div className="w-[95%] mx-auto p-[0.5rem] text-md font-normal cursor-pointer rounded-lg hover:bg-gray-100"
                        onClick={()=>setActiveMenu("pokemon")}
                    >
                        포켓몬 추가하기
                    </div>
                </aside>
                <div id="view" className="col-span-8">

                    {activeMenu === "box" && <BoxForm/>}
                    {activeMenu === "card" && <CardForm/>}
                    {activeMenu === "pokemon" && <PokemonForm/>}

                </div>
            </div>
        </div>
        </>
    );
}