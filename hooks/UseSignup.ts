import { useForm } from '@tanstack/react-form';
import { showToast } from '@/lib/toast';
import { handleAuthError } from '@/lib/handleAuthError';
import { signUpSchema } from '@/lib/schemas/authSchema';
import { signUp } from '@/services/auth.service';
import { getSafeRedirect } from '@/lib/safeRedirect';
import { persistUserSession } from '@/lib/session';
import { useRouter, useSearchParams } from 'next/navigation';

export const useSignUp = () => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const redirectTo = getSafeRedirect(searchParams.get('redirect'));
    const form = useForm({
        validators: {
            onSubmit: signUpSchema,
        },
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await signUp(
                    value.fullName,
                    value.email,
                    value.password
                );
                showToast.success(`Welcome, ${response.user.fullName}!`);
                persistUserSession(response.user.fullName, response.user.email);

                router.push(redirectTo);

            } catch (error) {
                handleAuthError(error, {
                    400: { message: "Invalid form data", useServerMessage: true },
                    409: { message: "Account already exists" },
                    500: { message: "Server error, please try again later" },
                }, "Something went wrong");
            }
        },
    });

    return { form };
};