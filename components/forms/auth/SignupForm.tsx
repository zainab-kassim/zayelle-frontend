'use client';
import { useState } from "react";
import Link from "next/link";
import { useSignUp } from "@/hooks/UseSignup";
import Loader from "@/components/ui/Loader";
import GoogleButton from "@/components/forms/auth/GoogleButton";
import PasswordToggle from "@/components/forms/auth/PasswordToggle";
import AuthPageShell from "@/components/forms/auth/AuthPageShell";
import FieldError from "@/components/forms/auth/FieldError";
import { INPUT_CLASS, LABEL_CLASS } from "@/components/forms/auth/fieldStyles";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { form } = useSignUp();

    return (
        <AuthPageShell title="Create your account" subtitle="Join Zayelle, your closet is waiting.">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setShowPassword(false);
                    form.handleSubmit();
                }}
            >
                {/* Continue with Google */}
                <div className="mb-6">
                    <GoogleButton />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-line" />
                    <span className="font-sans text-muted text-[11px] uppercase tracking-[0.14em]">or</span>
                    <div className="flex-1 h-px bg-line" />
                </div>

                {/* Full name */}
                <div className="mb-5">
                    <label className={`${LABEL_CLASS} mb-2`}>Full name</label>
                    <form.Field name="fullName">
                        {(field) => (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className={INPUT_CLASS}
                                />
                                <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label className={`${LABEL_CLASS} mb-2`}>Email</label>
                    <form.Field name="email">
                        {(field) => (
                            <>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className={INPUT_CLASS}
                                />
                                <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Password */}
                <div className="mb-7">
                    <label className={`${LABEL_CLASS} mb-2`}>Password</label>
                    <form.Field name="password">
                        {(field) => {
                            const showError = !!(field.state.meta.isTouched && field.state.meta.errors?.[0]);
                            return (
                                <>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create a password"
                                            autoComplete="new-password"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            className={INPUT_CLASS + " pr-11"}
                                        />
                                        <PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
                                    </div>
                                    {showError
                                        ? <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />
                                        : <p className="font-sans text-muted text-[12px] mt-1.5">Use at least 12 characters.</p>}
                                </>
                            );
                        }}
                    </form.Field>
                </div>

                {/* CTA */}
                <form.Subscribe selector={(state) => [state.isSubmitting]}>
                    {([isSubmitting]) => (
                        <button
                            type="button"
                            onClick={form.handleSubmit}
                            disabled={isSubmitting}
                            className="w-full bg-ink text-paper rounded-full py-4 font-sans font-medium uppercase tracking-[0.1em] text-[12px] flex items-center justify-center transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
                        >
                            {isSubmitting ? <Loader /> : "Create account"}
                        </button>
                    )}
                </form.Subscribe>

                {/* Footer */}
                <p className="text-center font-sans text-[13px] text-muted mt-7">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-ink font-medium border-b border-ink/40 hover:border-ink transition-colors duration-200">
                        Log in
                    </Link>
                </p>
            </form>
        </AuthPageShell>
    );
}
