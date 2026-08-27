'use client';
import { useState } from "react";
import Image from "next/image";
import { useSignUp } from "@/hooks/UseSignup";
import Loader from "@/components/ui/Loader";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { form } = useSignUp();

    const FieldError = ({ errors, isTouched }: { errors: any[], isTouched: boolean }) => {
        if (!isTouched || !errors?.[0]) return null;
        return <p className="text-red-500 text-[11px] mt-1">{errors[0].message}</p>;
    };

    return (
        <main className="min-h-screen bg-white md:bg-white flex flex-col items-center justify-start md:justify-center md:py-12">
            <div className="w-full md:max-w-[600px] bg-white overflow-hidden md:rounded-[24px] md:shadow-[0_8px_40px_rgba(0,0,0,0.10)]">

                {/* ── Blob Area ── */}
                <div className="relative h-[280px] overflow-hidden">

                    {/* Left blob — saturated variant of Zayelle's terracotta accent (#C2583A, from FlorealCollection's "See All" link), heavily clipped top-left */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: '320px',
                            height: '320px',
                            top: '-120px',
                            left: '-100px',
                            background: 'radial-gradient(circle at center, #E15A2E, #FFFFFF)',
                        }}
                    />

                    {/* Center blob — saturated red-orange, same terracotta family, clipped at top — needs to be vivid, not just dark, to survive 0.2 opacity without collapsing to grey */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: '300px',
                            height: '300px',
                            top: '-130px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'radial-gradient(circle at center, #D4451F, #FFFFFF)',
                            opacity: 0.2,
                        }}
                    />

                    {/* Right blob — lighter terracotta-peach tint of the same family, clipped top-right, extends further down */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: '340px',
                            height: '340px',
                            top: '-60px',
                            right: '-110px',
                            background: 'radial-gradient(circle at center, #E8A47E, #FFFFFF)',
                        }}
                    />
                </div>

                {/* ── Heading ── */}
                <div className="text-center -mt-28 relative z-10">
                    <h1
                        className="text-[#2C2420] mb-0.5 leading-tight text-[26px] md:text-[38px]"
                        style={{
                            fontFamily: "'DynaPuff', cursive",
                            fontWeight: 500,
                        }}
                    >
                        Welcome to Zayelle
                    </h1>
                    <p
                        className="text-[#5a5a5a] mb-14"
                        style={{
                            fontFamily: "'Cairo', sans-serif",
                            fontSize: '17px',
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

                        {/* Firstname + Lastname */}
                        <div className="flex gap-5 mb-6">
                            <div className="flex-1">
                                <label className="block text-[14px] font-medium text-black mb-2">
                                    Firstname
                                </label>
                                <form.Field name="firstName">
                                    {(field) => (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Enter firstname"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                className="w-full border-0 rounded-lg outline-none py-2.5 px-3 bg-[#F5F5F5] text-[14px] font-medium text-black placeholder-[#8B8282]"
                                            />

                                            <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />

                                        </>
                                    )}
                                </form.Field>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[14px] font-medium text-black mb-2">
                                    Lastname
                                </label>
                                <form.Field name="lastName">
                                    {(field) => (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Enter lastname"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                className="w-full border-0 rounded-lg outline-none py-2.5 px-3 bg-[#F5F5F5] text-[14px] font-medium text-black placeholder-[#8B8282]"
                                            />

                                            <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />

                                        </>
                                    )}
                                </form.Field>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label className="block text-[14px] font-medium text-black mb-2">
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
                                            className="w-full border-0 rounded-lg outline-none py-2.5 px-3 bg-[#F5F5F5] text-[14px] font-medium text-black placeholder-[#8B8282]"
                                        />

                                        <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />

                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Phonenumber */}
                        <div className="mb-6">
                            <label className="block text-[14px] font-medium text-black mb-2">
                                Phonenumber
                            </label>
                            <form.Field name="phoneNumber">
                                {(field) => (
                                    <>
                                        <input
                                            type="tel"
                                            placeholder="Enter phonenumber"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            className="w-full border-0 rounded-lg outline-none py-2.5 px-3 bg-[#F5F5F5] text-[14px] font-medium text-black placeholder-[#8B8282]"
                                        />

                                        <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />

                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Password + Confirm Password */}
                        <div className="flex gap-5 mb-6">
                            <div className="flex-1">
                                <label className="block text-[14px] font-medium text-black mb-2">
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
                                                    className="w-full border-0 rounded-lg outline-none py-2.5 pl-3 pr-10 bg-[#F5F5F5] text-[14px] font-medium text-black placeholder-[#8B8282]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-[#8B8282] cursor-pointer"
                                                >
                                                    {showPassword
                                                        ? <Image width={16} height={16} src="https://img.icons8.com/?size=100&id=4y6r43dyjbzw&format=png&color=000000" alt="Show" />
                                                        : <Image width={16} height={16} src="https://img.icons8.com/?size=100&id=85035&format=png&color=000000" alt="Hide" />}
                                                </button>
                                            </div>

                                            <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />

                                        </>
                                    )}
                                </form.Field>
                            </div>
                            <div className="flex-1">
                                <label className="block text-[14px] font-medium text-black mb-2">
                                    Confirm
                                </label>
                                <form.Field name="confirmPassword">
                                    {(field) => (
                                        <>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="Confirm"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    className="w-full border-0 rounded-lg outline-none py-2.5 pl-3 pr-10 bg-[#F5F5F5] text-[14px] font-medium text-black placeholder-[#8B8282]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-[#8B8282] cursor-pointer"
                                                >
                                                    {showConfirmPassword
                                                        ? <Image width={16} height={16} src="https://img.icons8.com/?size=100&id=4y6r43dyjbzw&format=png&color=000000" alt="Show" />
                                                        : <Image width={16} height={16} src="https://img.icons8.com/?size=100&id=85035&format=png&color=000000" alt="Hide" />}
                                                </button>
                                            </div>

                                            <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />

                                        </>
                                    )}
                                </form.Field>
                            </div>
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
                                                className="w-3.5 h-3.5 accent-[#4E8ED9] cursor-pointer flex-shrink-0"
                                            />
                                            <span className="text-[14px]  font-medium text-black">
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
                                    className="w-full bg-button-primary text-white rounded-[8px] py-4 mb-5 cursor-pointer text-[16px] font-bold flex items-center justify-center transition-colors duration-150 active:bg-button-primary-active disabled:bg-gray-950 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? <Loader /> : "Sign Up"}
                                </button>
                            )}
                        </form.Subscribe>

                        {/* Footer Text */}
                        <p className="text-center text-[14px] font-medium text-black">
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