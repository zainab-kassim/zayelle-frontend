'use client';
import Link from "next/link";
import Loader from "@/components/ui/Loader";
import { useForgotPassword } from "@/hooks/UseForgotPassword";
import AuthPageShell from "@/components/forms/auth/AuthPageShell";
import FieldError from "@/components/forms/auth/FieldError";
import { INPUT_CLASS, LABEL_CLASS } from "@/components/forms/auth/fieldStyles";

export default function ForgotPasswordForm() {
    const { form, submitted } = useForgotPassword();

    return (
        <AuthPageShell title="Forgot password?" subtitle="We'll email you a link to reset it.">
            {submitted ? (
                <p className="font-sans text-[14px] text-ink leading-relaxed text-center">
                    If an account exists for that email, a password reset link is on its way.
                    Check your inbox and spam folder.
                </p>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
                    <div className="mb-7">
                        <label className={`${LABEL_CLASS} mb-2`}>Email</label>
                        <form.Field name="email">
                            {(field) => (
                                <>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
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
                                {isSubmitting ? <Loader /> : "Send reset link"}
                            </button>
                        )}
                    </form.Subscribe>
                </form>
            )}

            <p className="text-center font-sans text-[13px] text-muted mt-7">
                Remembered it?{' '}
                <Link href="/auth/login" className="text-ink font-medium border-b border-ink/40 hover:border-ink transition-colors duration-200">
                    Log in
                </Link>
            </p>
        </AuthPageShell>
    );
}
