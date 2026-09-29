import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import {useAuth} from "../contexts/authContext";


export default function Admin(){
    const {user,loading : userloading} = useAuth();
    const navigate = useNavigate();
    
    //admin 검증
    useEffect(()=>{
        if(!userloading) return;

        if(user){}

        
    },[]);

    //insert box logic

    //insert cards logic

    //insert pokemon logic

    return (
        <>
        </>
    );
}