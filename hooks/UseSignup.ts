import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { signUpSchema } from '@/lib/schemas/authSchema';
import { signUp } from '@/services/auth.service';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

// Only ever redirect to a same-app relative path — the `redirect` query
// param comes straight from the URL, so a crafted link (?redirect=//evil.com
// or ?redirect=https://evil.com) must never be able to send a user off-site.
const getSafeRedirect = (path: string | null): string => {
    if (!path || !path.startsWith('/') || path.startsWith('//')) return '/';
    return path;
};

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
            // isLoading logic
            // form.state.isSubmitting — already provided by TanStack Form during submission

            try {
                const response = await signUp(
                    value.fullName,
                    value.email,
                    value.password
                );
                toast.success(`Welcome, ${response.user.fullName}!`);
                localStorage.setItem('fullName', response.user.fullName);
                localStorage.setItem('email', response.user.email);

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