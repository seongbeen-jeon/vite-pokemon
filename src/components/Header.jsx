import {Link} from 'react-router-dom';
import logo from '../../assets/pokedex_logo.png';

function Header(){
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
            <div id="login" className ="flex gap-2 items-center">
                <div className="shadow-md bg-[#3ba4fa] p-1.5 rounded-xl ">로그인</div>
                <div className="shadow-md p-1.5 rounded-xl">회원가입</div>
            </div>
        </header>
    );
}

export default Header