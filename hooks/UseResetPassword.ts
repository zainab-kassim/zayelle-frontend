import { useEffect, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { showToast } from '@/lib/toast';
import { handleAuthError } from '@/lib/handleAuthError';
import { resetPasswordSchema } from '@/lib/schemas/authSchema';
import { resetPassword, validateResetToken } from '@/services/auth.service';
import { useRouter, useSearchParams } from 'next/navigation';

export const useResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token') ?? '';

    // null while checking — the page shouldn't claim "invalid" before it
    // actually knows, and shouldn't claim "valid" either
    const [tokenStatus, setTokenStatus] = useState<{
        isChecking: boolean;
        isValid: boolean;
        expiresAt: string | null;
    }>({ isChecking: true, isValid: false, expiresAt: null });

    useEffect(() => {
        if (!token) {
            setTokenStatus({ isChecking: false, isValid: false, expiresAt: null });
            return;
        }
        let cancelled = false;
        validateResetToken(token)
            .then((res) => {
                if (cancelled) return;
                setTokenStatus({
                    isChecking: false,
                    isValid: res.valid,
                    expiresAt: res.expiresAt ?? null,
                });
            })
            .catch(() => {
                if (cancelled) return;
                // network hiccup shouldn't block the form — the real check
                // still happens server-side on submit
                setTokenStatus({ isChecking: false, isValid: true, expiresAt: null });
            });
        return () => { cancelled = true; };
    }, [token]);

    const form = useForm({
        validators: { onSubmit: resetPasswordSchema },
        defaultValues: { password: '', confirmPassword: '' },
        onSubmit: async ({ value }) => {
            if (!token) {
                showToast.error('This reset link is invalid or has expired.');
                return;
            }
            try {
                await resetPassword(token, value.password);
                showToast.success('Password updated. Please log in.');
                router.push('/auth/login');
            } catch (error) {
                handleAuthError(error, {
                    400: { message: 'This reset link is invalid or has expired.', useServerMessage: true },
                    429: { message: 'Too many requests. Please try again shortly.' },
                }, 'Something went wrong. Please try again.');
            }
        },
    });

    return { form, token, ...tokenStatus };
};
