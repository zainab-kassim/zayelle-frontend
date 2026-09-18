import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
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
                toast.success(`Welcome, ${response.user.fullName}!`);
                persistUserSession(response.user.fullName, response.user.email);

                router.push(redirectTo);

            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    const status = error.response?.status
                    const message = error.response?.data?.message

                    if (status === 400) {
                        toast.error(message || "Invalid form data")
                        console.log("Validation error details:", error.response?.data)
                    } else if (status === 409) {
                        toast.error("Account already exists")
                    } else if (status === 500) {
                        toast.error("Server error, please try again later")
                    } else {
                        toast.error("Something went wrong")
                    }
                }
            }
        },
    });

    return { form };
};