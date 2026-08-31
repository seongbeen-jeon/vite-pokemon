import { createContext,useContext,useState,useEffect} from "react";
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);


export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);


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

    return (
        <AuthContext.Provider value={{user,loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}
