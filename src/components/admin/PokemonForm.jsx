import {supabase} from "../../lib/supabase";
import {useAuth} from "../../contexts/authContext.jsx";

export default function PokemonForm(){
    const {user, session} = useAuth();

    console.log("user : ", user);
    console.log("session : ", session);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);

        const response = await fetch("/api/admin/insertPokemon",{
            method : "POST",
            headers : {
                Authorization : `Bearer ${session.access_token}`
            },
            body : formData,
        });
        console.log("response : ", response);
        if(response.ok){
            alert("포켓몬 데이터가 성공적으로 추가되었습니다.");
        }
    }

    return(
    <>
    <div id="container" className="w-full border border-1">
        <form onSubmit={handleSubmit} className="w-[10rem]">
            <input type="file" name="file"></input>
            <button type="submit">Submit</button>
        </form>
        
    </div>
    </>
    );
}