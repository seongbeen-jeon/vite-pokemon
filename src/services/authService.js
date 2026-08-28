import {supabase} from "../lib/supabase";

export async function signUp(email, password, nickname){

    const {data, error} = await supabase.auth.signUp({
        email : email,
        password : password,
        options : {
            data : {
                nickname : nickname,
            }
        }
    });

    if(error){
        throw error;
    }

    return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

    if(error){
        throw error;
    }
  return data;
}

export async function signOut(){
    const {error} = await supabase.auth.signOut();
    if(error){
        throw error;
    }
}