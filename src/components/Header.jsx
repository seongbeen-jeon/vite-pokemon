import {Link} from 'react-router-dom';
import logo from '../../asset/pokedex_logo.png';
import {useAuth} from '../contexts/authContext';
import {signOut} from '../services/authService';

function Header(){
    const {user,loading} = useAuth();

    if(loading){
        return(
            <div>
                loading...
            </div>
        )
    }
    return (
        <header id="header" className="flex justify-between items-center px-12 h-20 shadow-sm">
            <div id="logo" className="">
                <Link className="flex items-center" to="/">
                    <img className="w-10" src={logo} alt="Pokedex Logo"/>
                    <div className="title p-1">PokeDex</div>
                </Link>
            </div>
            <div id="nav" className="flex gap-10">
                <Link to="/sets" className="text-lg font-medium">도감</Link>
                <Link to="/album" className="text-lg font-medium">앨범</Link>
            </div>
            {user ? (
                <div id="user" className ="flex gap-2 items-center">
                    <div className="p-1.5">{user?.userinfo?.nickname}님</div>
                    <div onClick={signOut} className="shadow-md p-1.5 rounded-xl">로그아웃</div>
                </div>
                )
                :(
                <div id="login" className ="flex gap-2 items-center">
                    <Link to="/signin"  className="shadow-md bg-[#3ba4fa] p-1.5 rounded-xl ">로그인</Link>
                    <Link to="/signup" className="shadow-md p-1.5 rounded-xl">회원가입</Link>
                </div>
                )
            }
            
        </header>
    );
}

export default Header