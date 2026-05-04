import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { loginSchema } from '@/lib/schemas/authSchema';
import { login} from '@/services/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';



export const useLogIn = () => {
    const router = useRouter()
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
                toast.success(`Welcome back, ${response.user.firstname}!`);

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