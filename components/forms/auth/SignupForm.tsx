'use client';
import { useState } from "react";
import Image from "next/image";
import { useSignUp } from "@/hooks/UseSignup";
import Loader from "@/components/ui/Loader";
import GoogleButton from "@/components/forms/auth/GoogleButton";
import AppleButton from "@/components/forms/auth/AppleButton";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);

    const { form } = useSignUp();

    const FieldError = ({ errors, isTouched }: { errors: any[], isTouched: boolean }) => {
        if (!isTouched || !errors?.[0]) return null;
        return <p className="text-red-500 text-[13px] mt-1.5">{errors[0].message}</p>;
    };

    return (
        <main className="min-h-screen bg-white md:bg-white flex flex-col items-center justify-start md:justify-center md:py-12">
            <div
                className="w-full md:max-w-[660px] bg-white overflow-hidden overflow-y-auto max-h-screen md:max-h-[calc(100vh-6rem)] no-scrollbar md:rounded-[24px] md:shadow-[0_8px_40px_rgba(0,0,0,0.10)]"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >

                {/* ── Header Image — organza floral (Floreal Collection), replaces the blob area.
                     Masked to fade to transparent at the bottom so it dissolves into the card's
                     white background instead of getting hard-cropped — no visible seam, and the
                     heading below can sit on top of it since that faded zone is legible. ── */}
                <div
                    className="relative h-[165px] md:h-[200px] overflow-hidden"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.08) 92%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.08) 92%, transparent 100%)',
                    }}
                >
                    <Image
                        src="/auth/signup-header.png"
                        alt=""
                        fill
                        sizes="(min-width: 768px) 600px, 100vw"
                        className="object-cover"
                        priority
                    />
                </div>

                {/* ── Heading ── */}
                <div className="text-center -mt-16 md:-mt-32 relative z-10">
                    <h1
                        className="text-[#2C2420] mb-0.5 leading-tight text-[26px] md:text-[33px]"
                        style={{
                            fontFamily: '"Expletus Sans", serif',
                            fontWeight: 600,
                        }}
                    >
                        Welcome to Zayelle
                    </h1>
                    <p
                        className="text-[#2C2420] mb-5 md:mb-9 font-medium text-[14px] md:text-[17px]"
                        style={{
                            fontFamily: "'Cairo', sans-serif",
                        }}
                    >
                        Create your account
                    </p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setShowPassword(false);
                        form.handleSubmit();
                    }}
                >
                    {/* ── Form ── */}
                    <div className="px-7 pb-10">

                        {/* Social sign-in */}
                        <div className="flex flex-col gap-3 mb-6">
                            <GoogleButton />
                            <AppleButton />
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-[#E0E0E0]" />
                            <span className="text-[13px] text-[#8B8282]">or</span>
                            <div className="flex-1 h-px bg-[#E0E0E0]" />
                        </div>

                        {/* Full Name + Email */}
                        <div className="flex flex-col md:flex-row gap-5 mb-6">
                            <div className="flex-1">
                                <label className="block text-[14px] md:text-[16.5px] font-medium text-[#1a1a1a] mb-2.5">
                                    Full Name
                                </label>
                                <form.Field name="fullName">
                                    {(field) => (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Enter full name"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                className="w-full border-0 rounded-lg outline-none py-3 px-3.5 md:py-3.5 md:px-4 bg-[#F5F5F5] text-[14px] md:text-[16.5px] font-medium text-[#1a1a1a] placeholder-[#8B8282] transition-colors duration-150 hover:bg-[#EFEFEF] focus:bg-white focus:ring-[0.5px] focus:ring-black"
                                            />

                                            <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />

                                        </>
                                    )}
                                </form.Field>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[14px] md:text-[16.5px] font-medium text-[#1a1a1a] mb-2.5">
                                    Email
                                </label>
                                <form.Field name="email">
                                    {(field) => (
                                        <>
                                            <input
                                                type="email"
                                                placeholder="Enter email"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                className="w-full border-0 rounded-lg outline-none py-3 px-3.5 md:py-3.5 md:px-4 bg-[#F5F5F5] text-[14px] md:text-[16.5px] font-medium text-[#1a1a1a] placeholder-[#8B8282] transition-colors duration-150 hover:bg-[#EFEFEF] focus:bg-white focus:ring-[0.5px] focus:ring-black"
                                            />

                                            <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />

                                        </>
                                    )}
                                </form.Field>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <label className="block text-[14px] md:text-[16.5px] font-medium text-[#1a1a1a] mb-2.5">
                                Password
                            </label>
                            <form.Field name="password">
                                {(field) => (
                                    <>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter Password"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                className="w-full border-0 rounded-lg outline-none py-3 pl-3.5 md:py-3.5 md:pl-4 pr-12 md:pr-10 bg-[#F5F5F5] text-[14px] md:text-[16.5px] font-medium text-[#1a1a1a] placeholder-[#8B8282] transition-colors duration-150 hover:bg-[#EFEFEF] focus:bg-white focus:ring-[0.5px] focus:ring-black"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-[#8B8282] cursor-pointer"
                                            >
                                                {showPassword
                                                    ? <Image width={19} height={19} src="https://img.icons8.com/?size=100&id=4y6r43dyjbzw&format=png&color=000000" alt="Show" />
                                                    : <Image width={19} height={19} src="https://img.icons8.com/?size=100&id=85035&format=png&color=000000" alt="Hide" />}
                                            </button>
                                        </div>

                                        <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />

                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Checkbox Row */}
                        <div className="mb-7">
                            <form.Field name="agreeToPolicy">
                                {(field) => (
                                    <>
                                        <div className="relative flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.checked)}
                                                onBlur={field.handleBlur}
                                                className="w-4 h-4 accent-[#4E8ED9] cursor-pointer flex-shrink-0"
                                            />
                                            <span className="text-[16px] font-medium text-[#1a1a1a]">
                                                I agree with{' '}
                                                <a href="#" className="text-[#4E8ED9] underline">
                                                    privacy policy
                                                </a>
                                            </span>
                                        </div>

                                        <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />
                                    </>

                                )}
                            </form.Field>
                        </div>

                        {/* CTA Button with Loader Integration */}
                        <form.Subscribe selector={(state) => [state.isSubmitting]}>
                            {([isSubmitting]) => (
                                <button
                                    type="button"
                                    onClick={form.handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full bg-button-primary text-white rounded-[8px] py-4 mb-6 cursor-pointer text-[18px] font-bold flex items-center justify-center transition-colors duration-150 hover:bg-button-primary-active active:bg-button-primary-active disabled:bg-gray-950 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? <Loader /> : "Sign Up"}
                                </button>
                            )}
                        </form.Subscribe>

                        {/* Footer Text */}
                        <p className="text-center text-[16px] font-medium text-[#1a1a1a]">
                            You already have an account?{' '}
                            <a href="/auth/login" className="text-[#4E8ED9]">
                                Login
                            </a>
                        </p>
                    </div>
                </form>

            </div>
        </main>
    );
}