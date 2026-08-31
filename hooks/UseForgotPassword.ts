import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { useState } from 'react';
import { forgotPasswordSchema } from '@/lib/schemas/authSchema';
import { requestPasswordReset } from '@/services/auth.service';
import axios from 'axios';

export const useForgotPassword = () => {
    const [submitted, setSubmitted] = useState(false);

    const form = useForm({
        validators: { onSubmit: forgotPasswordSchema },
        defaultValues: { email: '' },
        onSubmit: async ({ value }) => {
            try {
                await requestPasswordReset(value.email);
                setSubmitted(true);
                toast.success(
                    "If an account exists for that email, we've sent a reset link."
                );
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 429) {
                        toast.error('Too many requests. Please try again shortly.');
                    } else {
                        toast.error('Something went wrong. Please try again.');
                    }
                }
            }
        },
    });

    return { form, submitted };
};
