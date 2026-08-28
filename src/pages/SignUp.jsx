import { signUp } from "../services/authService";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkpassword, setCheckpassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [nickname,setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(checked){
            try {
                const data = await signUp(email, password, nickname);
                navigate('/',{replace : true});
            } catch (error) {
                console.error(error);
            }
        }else{
            alert("비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white">
            <div className="w-full max-w-[420px] rounded-[20px] bg-white px-8 py-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">

                <h2 className="mb-8 text-2xl font-bold text-[#1A1D1F]">
                    회원가입
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className="mb-5 text-left">
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-[#6F767E]"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="
                                h-12 w-full rounded-xl
                                border border-[#E6E8EC]
                                px-4
                                text-[15px] text-[#1A1D1F]
                                outline-none
                                transition-colors
                                focus:border-[#2A85FF]
                            "
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-5 text-left">

                        <div className="mb-2 flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-[#6F767E]"
                            >
                                Password
                            </label>

                            <a
                                href="#"
                                className="text-sm font-semibold text-[#2A85FF] hover:underline"
                            >
                                Forgot ?
                            </a>
                        </div>

                        <div className="relative ">

                            <input
                                type="password"
                                id="password"
                                value={password}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="
                                    h-12 w-full rounded-xl
                                    border border-[#E6E8EC]
                                    px-4 pr-12
                                    text-[15px] text-[#1A1D1F]
                                    outline-none
                                    transition-colors
                                    focus:border-[#2A85FF]
                                "
                            />

                            <input
                                type="password"
                                id="checkpassword"
                                value={checkpassword}
                                placeholder="check your password"
                                onChange={(e) => {
                                    const nextCheckPassword = e.target.value;
                                    setCheckpassword(nextCheckPassword);
        
                                    // e.target.value와 현재 password를 직접 비교
                                    if (password === nextCheckPassword) {
                                        setChecked(true);
                                    } else {
                                        setChecked(false);
                                    }
                                }}
                                required
                                className="
                                    mt-5
                                    h-12 w-full rounded-xl
                                    border border-[#E6E8EC]
                                    px-4 pr-12
                                    text-[15px] text-[#1A1D1F]
                                    outline-none
                                    transition-colors
                                    focus:border-[#2A85FF]
                                "
                            />
                            
                        </div>
                    </div>
                    {/* nickname */}
                    <div className="mb-5 text-left">
                        <label
                            htmlFor="nickname"
                            className="mb-2 block text-sm font-semibold text-[#6F767E]"
                        >
                            Nickname
                        </label>
                            <input
                                type="text"
                                id="nickname"
                                value={nickname}
                                placeholder="check your nickname"
                                onChange={(e) => setNickname(e.target.value)}
                                required
                                className="
                                    mt-5
                                    h-12 w-full rounded-xl
                                    border border-[#E6E8EC]
                                    px-4 pr-12
                                    text-[15px] text-[#1A1D1F]
                                    outline-none
                                    transition-colors
                                    focus:border-[#2A85FF]
                                "
                            />
                    </div>


                    {/* Sign In button */}
                    <button
                        type="submit"
                        className="
                            mt-2 mb-3
                            h-12 w-full
                            rounded-xl
                            border-none
                            bg-[#1D72E8]
                            text-[15px] font-semibold text-white
                            cursor-pointer
                            transition-colors
                            hover:bg-[#1557B0]
                        "
                    >
                        회원가입
                    </button>

                </form>
            </div>
        </div>
    );
}