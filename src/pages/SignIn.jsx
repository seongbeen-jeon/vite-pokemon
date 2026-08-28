import { signIn } from "../services/authService";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await signIn(email, password);
            console.log(data);
            navigate('/', {replace : true});
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다.');
        }
        return ;
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white">
            <div className="w-full max-w-[420px] rounded-[20px] bg-white px-8 py-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">

                <h2 className="mb-8 text-2xl font-bold text-[#1A1D1F]">
                    로그인
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

                        <div className="relative flex items-center">

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

                            <button
                                type="button"
                                aria-label="Toggle password visibility"
                                className="
                                    absolute right-3
                                    flex items-center justify-center
                                    border-none bg-transparent
                                    text-[#9A9FA5]
                                    cursor-pointer
                                "
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </button>

                        </div>
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
                        Sign In
                    </button>

                </form>
            </div>
        </div>
    );
}