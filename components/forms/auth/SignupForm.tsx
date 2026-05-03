'use client';
import { useState } from "react";
import Image from "next/image";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                    className="text-center  text-[#2C2420] -mt-28 mb-14 relative z-10"
                    style={{
                        fontFamily: "'DynaPuff', cursive",
                        fontWeight: 500,
                        fontSize: '40px',
                    }}
                >
                    Zayelle
                </h1>

                {/* ── Form ── */}
                <div className="px-7 pb-10">

                    {/* Firstname + Lastname */}
                    <div className="flex gap-5 mb-6">
                        <div className="flex-1">
                            <label
                                className="block text-[12px] text-black mb-2"

                            >
                                Firstname
                            </label>
                            <input
                                type="text"
                                placeholder="Enter firstname"
                                className="w-full border-0 rounded-md border-b border-[#C0C0C0] outline-none py-1.5 px-2 bg-transparent text-[12px] text-black placeholder-[#8B8282]"

                            />
                        </div>
                        <div className="flex-1">
                            <label
                                className="block text-[12px] text-black mb-2"

                            >
                                Lastname
                            </label>
                            <input
                                type="text"
                                placeholder="Enter lastname"
                                className="w-full border-0 rounded-md border-b border-[#C0C0C0] outline-none py-1.5 px-2 bg-transparent text-[12px] text-black placeholder-[#8B8282]"

                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-6">
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

                    {/* Phonenumber */}
                    <div className="mb-6">
                        <label
                            className="block text-[12px] text-black mb-2"

                        >
                            Phonenumber
                        </label>
                        <input
                            type="tel"
                            placeholder="Enter phonenumber"
                            className="w-full border-0 border-b rounded-md border-[#C0C0C0] outline-none py-1.5 px-2 bg-transparent text-[12px] text-black placeholder-[#8B8282]"

                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
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

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label
                            className="block text-[12px] text-black mb-2"

                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                className="w-full border-0 rounded-md border-b border-[#C0C0C0] outline-none py-1.5 px-2 bg-transparent text-[12px] text-black placeholder-[#8B8282]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-[#8B8282] cursor-pointer"
                            >
                                {showConfirmPassword ? <Image width={16} height={16} src="https://img.icons8.com/?size=100&id=4y6r43dyjbzw&format=png&color=000000" alt="Show" /> : <Image width={16} height={16} src="https://img.icons8.com/?size=100&id=85035&format=png&color=000000" alt="Hide" />}
                            </button>
                        </div>
                    </div>

                    {/* Checkbox Row */}
                    <div className="flex items-center gap-2 mb-7">
                        <input
                            type="checkbox"
                            className="w-3.5 h-3.5 accent-[#4E8ED9] cursor-pointer flex-shrink-0"
                        />
                        <span
                            className="text-[12px] text-black"

                        >
                            I agree with{' '}
                            <a href="#" className="text-[#4E8ED9] underline">
                                privacy policy
                            </a>
                        </span>
                    </div>

                    {/* CTA Button */}
                    <button
                        className="w-full bg-black text-white rounded-[8px] py-4 mb-5 cursor-pointer text-[16px] font-bold"

                    >
                        Sign Up
                    </button>

                    {/* Footer Text */}
                    <p
                        className="text-center text-[12px] text-black"

                    >
                        You already have an account?{' '}
                        <a href="/login" className="text-[#4E8ED9]">
                            Login
                        </a>
                    </p>
                </div>

            </div>
        </main>
    );
}