'use client';
import { useState } from "react";
import Link from "next/link";
import Loader from "@/components/ui/Loader";
import { useResetPassword } from "@/hooks/UseResetPassword";
import PasswordToggle from "@/components/forms/auth/PasswordToggle";
import AuthPageShell from "@/components/forms/auth/AuthPageShell";
import FieldError from "@/components/forms/auth/FieldError";
import { INPUT_CLASS, LABEL_CLASS } from "@/components/forms/auth/fieldStyles";

export default function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { form, token } = useResetPassword();

    return (
        <AuthPageShell title="Set a new password" subtitle="Choose a password you haven't used before.">
            {!token ? (
                <p className="font-sans text-[14px] text-ink leading-relaxed">
                    This reset link is invalid or has expired.{' '}
                    <Link href="/auth/forgot-password" className="text-ink font-medium border-b border-ink/40 hover:border-ink transition-colors duration-200">
                        Request a new one
                    </Link>.
                </p>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); setShowPassword(false); form.handleSubmit(); }}>
                    <div className="mb-5">
                        <label className={`${LABEL_CLASS} mb-2`}>New password</label>
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
                                            className={INPUT_CLASS + " pr-11"}
                                        />
                                        <PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
                                    </div>
                                    <FieldError errors={field.state.meta.errors} isTouched={field.state.meta.isTouched} />
                                </>
                            )}
                        </form.Field>
                    </div>

                    <div className="mb-7">
                        <label className={`${LABEL_CLASS} mb-2`}>Confirm password</label>
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
                                        className={INPUT_CLASS}
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
                                className="w-full bg-ink text-paper rounded-full py-4 font-sans font-medium uppercase tracking-[0.1em] text-[12px] flex items-center justify-center transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
                            >
                                {isSubmitting ? <Loader /> : "Update password"}
                            </button>
                        )}
                    </form.Subscribe>
                </form>
            )}
        </AuthPageShell>
    );
}
