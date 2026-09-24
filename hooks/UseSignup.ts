import { useForm } from '@tanstack/react-form';
import { showToast } from '@/lib/toast';
import { signUpSchema } from '@/lib/schemas/authSchema';
import { signUp } from '@/services/auth.service';
import { getSafeRedirect } from '@/lib/safeRedirect';
import { persistUserSession } from '@/lib/session';
import axios from 'axios';
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

            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    const status = error.response?.status
                    const message = error.response?.data?.message

                    if (status === 400) {
                        showToast.error(message || "Invalid form data")
                    } else if (status === 409) {
                        showToast.error("Account already exists")
                    } else if (status === 500) {
                        showToast.error("Server error, please try again later")
                    } else {
                        showToast.error("Something went wrong")
                    }
                }
            }
        },
    });

    return { form };
};