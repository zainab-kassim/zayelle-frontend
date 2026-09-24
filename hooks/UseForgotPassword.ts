import { useForm } from '@tanstack/react-form';
import { showToast } from '@/lib/toast';
import { handleAuthError } from '@/lib/handleAuthError';
import { useState } from 'react';
import { forgotPasswordSchema } from '@/lib/schemas/authSchema';
import { requestPasswordReset } from '@/services/auth.service';

export const useForgotPassword = () => {
    const [submitted, setSubmitted] = useState(false);

    const form = useForm({
        validators: { onSubmit: forgotPasswordSchema },
        defaultValues: { email: '' },
        onSubmit: async ({ value }) => {
            try {
                await requestPasswordReset(value.email);
                setSubmitted(true);
                showToast.success(
                    "If an account exists for that email, we've sent a reset link."
                );
            } catch (error) {
                handleAuthError(error, {
                    429: { message: 'Too many requests. Please try again shortly.' },
                }, 'Something went wrong. Please try again.');
            }
        },
    });

    return { form, submitted };
};
