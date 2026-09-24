import { useForm } from '@tanstack/react-form';
import { showToast } from '@/lib/toast';
import { handleAuthError } from '@/lib/handleAuthError';
import { loginSchema } from '@/lib/schemas/authSchema';
import { login } from '@/services/auth.service';
import { getSafeRedirect } from '@/lib/safeRedirect';
import { persistUserSession } from '@/lib/session';
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

            } catch (error) {
                handleAuthError(error, {
                    400: { message: "Invalid form data", useServerMessage: true },
                    // same generic message for wrong password, unknown email, or a Google-only account
                    401: { message: "Invalid email or password", useServerMessage: true },
                    409: { message: "Account already exists" },
                    500: { message: "Server error, please try again later" },
                }, "Something went wrong");
            }
        },
    });

    return { form };
};