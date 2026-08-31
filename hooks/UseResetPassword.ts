import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { resetPasswordSchema } from '@/lib/schemas/authSchema';
import { resetPassword } from '@/services/auth.service';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export const useResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token') ?? '';

    const form = useForm({
        validators: { onSubmit: resetPasswordSchema },
        defaultValues: { password: '', confirmPassword: '' },
        onSubmit: async ({ value }) => {
            if (!token) {
                toast.error('This reset link is invalid or has expired.');
                return;
            }
            try {
                await resetPassword(token, value.password);
                toast.success('Password updated. Please log in.');
                router.push('/auth/login');
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    const status = error.response?.status;
                    const message = error.response?.data?.message;
                    if (status === 400) {
                        toast.error(message || 'This reset link is invalid or has expired.');
                    } else if (status === 429) {
                        toast.error('Too many requests. Please try again shortly.');
                    } else {
                        toast.error('Something went wrong. Please try again.');
                    }
                }
            }
        },
    });

    return { form, token };
};
