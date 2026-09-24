import { useForm } from '@tanstack/react-form';
import { showToast } from '@/lib/toast';
import { handleAuthError } from '@/lib/handleAuthError';
import { resetPasswordSchema } from '@/lib/schemas/authSchema';
import { resetPassword } from '@/services/auth.service';
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

    return { form, token };
};
