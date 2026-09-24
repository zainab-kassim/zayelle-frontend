import { useForm } from '@tanstack/react-form';
import { showToast } from '@/lib/toast';
import { loginSchema } from '@/lib/schemas/authSchema';
import { login } from '@/services/auth.service';
import { getSafeRedirect } from '@/lib/safeRedirect';
import { persistUserSession } from '@/lib/session';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export const useLogIn = () => {
    const router = useRouter();
        const searchParams = useSearchParams();
    const redirectTo = getSafeRedirect(searchParams.get('redirect'));
    const form = useForm({
        validators: {
            onSubmit: loginSchema,
        },
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await login(
                    value.email,
                    value.password,
                );
                 showToast.success(`Welcome back, ${response.user.fullName}!`);
                persistUserSession(response.user.fullName, response.user.email);
                router.push(decodeURIComponent(redirectTo));

            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    const status = error.response?.status;
                    const message = error.response?.data?.message;

                    if (status === 400) {
                        showToast.error(message || "Invalid form data");
                    } else if (status === 401) {
                        // same generic message for wrong password, unknown email, or a Google-only account
                        showToast.error(message || "Invalid email or password");
                    } else if (status === 409) {
                        showToast.error("Account already exists");
                    } else if (status === 500) {
                        showToast.error("Server error, please try again later");
                    } else {
                        showToast.error("Something went wrong");
                    }
                }
            }
        },
    });

    return { form };
};