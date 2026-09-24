import { toast as sonnerToast } from 'sonner';
import CustomToast from '@/components/ui/CustomToast';

interface ToastOptions {
    id?: string | number;
}

export const showToast = {
    success: (message: string, options?: ToastOptions) =>
        sonnerToast.custom(
            (id) => <CustomToast variant="success" message={message} onDismiss={() => sonnerToast.dismiss(id)} />,
            options
        ),
    error: (message: string, options?: ToastOptions) =>
        sonnerToast.custom(
            (id) => <CustomToast variant="error" message={message} onDismiss={() => sonnerToast.dismiss(id)} />,
            options
        ),
};
