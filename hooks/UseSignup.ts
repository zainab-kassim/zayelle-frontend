import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { signUpSchema } from '@/lib/schemas/authSchema';
import { signUp } from '@/services/auth.service';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useSignUp = () => {
      const router = useRouter();
    const form = useForm({
        validators: {
            onSubmit: signUpSchema,
        },
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            agreeToPolicy: false,
        },
        onSubmit: async ({ value }) => {
            // isLoading logic
            // form.state.isSubmitting — already provided by TanStack Form during submission

            try {
                const response = await signUp(
                    value.firstName,
                    value.lastName,
                    value.email,
                    value.phoneNumber,
                    value.password,
                    value.confirmPassword
                );
                toast.success(`Welcome, ${response.user.firstname}!`);
                localStorage.setItem('firstName', response.user.firstname);

                router.push('/');

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