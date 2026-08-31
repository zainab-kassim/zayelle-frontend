'use client';
import { useState } from "react";
import Image from "next/image";
import Loader from "@/components/ui/Loader";
import { useResetPassword } from "@/hooks/UseResetPassword";

export default function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { form, token } = useResetPassword();

    const FieldError = ({ errors, isTouched }: { errors: any[], isTouched: boolean }) => {
        if (!isTouched || !errors?.[0]) return null;
        return <p className="text-red-500 text-[13px] mt-1.5">{errors[0].message}</p>;
    };

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-start md:justify-center md:py-12">
            <div className="w-full md:max-w-[600px] bg-white overflow-hidden md:rounded-[24px] md:shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
                <div
                    className="relative h-[190px] md:h-[280px] overflow-hidden"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.08) 92%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.08) 92%, transparent 100%)',
                    }}
                >
                    <Image src="/auth/signup-header.png" alt="" fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" priority />
                </div>

                <div className="text-center -mt-20 md:-mt-32 relative z-10">
                    <h1 className="text-[#2C2420] mb-0.5 leading-tight text-[29px] md:text-[33px]" style={{ fontFamily: '"Expletus Sans", serif', fontWeight: 600 }}>
                        Set a new password
                    </h1>
                    <p className="text-[#2C2420] mb-7 md:mb-9 font-medium text-[14px] md:text-[17px]" style={{ fontFamily: "'Cairo', sans-serif" }}>
                        Choose a password you haven&apos;t used before
                    </p>
                </div>

                <div className="px-7 lg:px-12 pb-14 lg:pb-16">
                    {!token ? (
                        <p className="text-center text-[15px] font-medium text-[#1a1a1a]">
                            This reset link is invalid or has expired.{' '}
                            <a href="/auth/forgot-password" className="text-[#4E8ED9] underline">Request a new one</a>.
                        </p>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); setShowPassword(false); form.handleSubmit(); }}>
                            <div className="mb-7">
                                <label className="block text-[15px] md:text-[18px] font-medium text-[#1a1a1a] mb-2.5">New password</label>
                                <form.Field name="password">
                                    {(field) => (
                                        <>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter new password"
                                                    autoComplete="new-password"
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    className="w-full border-0 rounded-lg outline-none py-3 pl-3 md:py-4 md:pl-4 pr-10 bg-[#F5F5F5] text-[15px] md:text-[18px] font-medium text-[#1a1a1a] placeholder-[#8B8282] transition-colors duration-150 hover:bg-[#EFEFEF] focus:bg-white focus:ring-[0.5px] focus:ring-black"
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

                            <div className="mb-7">
                                <label className="block text-[15px] md:text-[18px] font-medium text-[#1a1a1a] mb-2.5">Confirm password</label>
                                <form.Field name="confirmPassword">
                                    {(field) => (
                                        <>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Re-enter new password"
                                                autoComplete="new-password"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                onBlur={field.handleBlur}
                                                className="w-full border-0 rounded-lg outline-none py-3 px-3 md:py-4 md:px-4 bg-[#F5F5F5] text-[15px] md:text-[18px] font-medium text-[#1a1a1a] placeholder-[#8B8282] transition-colors duration-150 hover:bg-[#EFEFEF] focus:bg-white focus:ring-[0.5px] focus:ring-black"
                                            />
                                            <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />
                                        </>
                                    )}
                                </form.Field>
                            </div>

                            <form.Subscribe selector={(state) => [state.isSubmitting]}>
                                {([isSubmitting]) => (
                                    <button
                                        type="button"
                                        onClick={form.handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full bg-button-primary text-white rounded-[8px] py-4 mb-6 cursor-pointer text-[18px] font-bold flex items-center justify-center transition-colors duration-150 hover:bg-button-primary-active active:bg-button-primary-active disabled:bg-gray-950 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? <Loader /> : "Update password"}
                                    </button>
                                )}
                            </form.Subscribe>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
