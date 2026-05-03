'use client';
import { useState } from "react";
import Image from "next/image";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="min-h-screen bg-white md:bg-white flex flex-col items-center justify-start md:justify-center md:py-12">
            <div className="w-full md:max-w-[480px] bg-white overflow-hidden md:rounded-[24px] md:shadow-[0_8px_40px_rgba(0,0,0,0.10)]">

                {/* ── Blob Area ── */}
                <div className="relative h-[280px] overflow-hidden">

                    {/* Left blob — hot pink, heavily clipped top-left */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: '320px',
                            height: '320px',
                            top: '-120px',
                            left: '-100px',
                            background: 'radial-gradient(circle at center, #FE3B92, #FFFFFF)',
                        }}
                    />

                    {/* Center blob — soft pale pink, clipped at top */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: '300px',
                            height: '300px',
                            top: '-130px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'radial-gradient(circle at center, #D94E50, #FFFFFF)',
                            opacity: 0.2,
                        }}
                    />

                    {/* Right blob — salmon-pink, clipped top-right, extends further down */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: '340px',
                            height: '340px',
                            top: '-60px',
                            right: '-110px',
                            background: 'radial-gradient(circle at center, #D94E71, #FFFFFF)',
                        }}
                    />
                </div>

                {/* ── Logo ── */}
                <h1
                    className="text-center  text-[#2C2420] -mt-20 mb-14 relative z-10"
                    style={{
                        fontFamily: "'DynaPuff', cursive",
                        fontWeight: 500,
                        fontSize: '33px',
                    }}
                >
                    Welcome Back
                </h1>

                {/* ── Form ── */}
                <div className="px-7 pb-28">

                    {/* Email */}
                    <div className="mb-16">
                        <label
                            className="block text-[12px] text-black mb-2"

                        >
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full border-0 rounded-md border-b border-[#C0C0C0] outline-none py-1.5 px-2 bg-transparent text-[12px] text-black placeholder-[#8B8282]"

                        />
                    </div>


                    {/* Password */}
                    <div className="mb-24">
                        <label
                            className="block text-[12px] text-black mb-2"

                        >
                            Password
                        </label>
                        <div className="relative">
                             <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter Password"
                            className="w-full border-0 rounded-md border-b border-[#C0C0C0] outline-none py-1.5 px-2 bg-transparent text-[12px] text-black placeholder-[#8B8282]"

                        />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-[#8B8282] cursor-pointer"
                            >
                                {showPassword ? <Image width={16} height={16} src="https://img.icons8.com/?size=100&id=4y6r43dyjbzw&format=png&color=000000" alt="Show" /> : <Image width={16} height={16} src="https://img.icons8.com/?size=100&id=85035&format=png&color=000000" alt="Hide" />}
                            </button>
                        </div>
                    </div>

                  

                   

                    {/* CTA Button */}
                    <button
                        className="w-full bg-black text-white rounded-[8px] py-4 mb-5 cursor-pointer text-[16px] font-bold"

                    >
                        Login
                    </button>

                    {/* Footer Text */}
                    <p
                        className="text-center text-[12px] text-black"

                    >
                        Don't have an account?{' '}
                        <a href="/signup" className="text-[#4E8ED9]">
                            Sign Up
                        </a>
                    </p>
                </div>

            </div>
        </main>
    );
}