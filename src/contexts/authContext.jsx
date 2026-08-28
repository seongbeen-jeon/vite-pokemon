import { createContext,useContext,useState,useEffect} from "react";
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

console.log("AuthContext 파일 로드됨");

export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("AuthProvider 실행");

    async function loadUser(session){
        if(!session?.user){
            setUser(null);
            return ;
        }
        const {data : userinfo, error} = await supabase
            .from("userinfo")
            .select("*")
            .single();

        if(error){
            console.error(error);
            return ;
        }
        
        const userdata = {
            user : session.user,
            userinfo : userinfo,
        };

        console.log("최종 userdata:", userdata);

        setUser(userdata);
    }
    useEffect(()=>{
        async function init(){
            const {
                data : {session}
            } = await supabase.auth.getSession();

            await loadUser(session);

            setLoading(false);
        }

        init();

        const {
            data : {subscription}
        } = supabase.auth.onAuthStateChange(
            (event,session)=>{
                loadUser(session);
            }
        );
        return ()=>{subscription.unsubscribe();}
    },[]);

    console.log("provider 가 제공하는 user : ", {user})
    return (
        <AuthContext.Provider value={{user,loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    console.log("useAuth start");
    return useContext(AuthContext);
}
