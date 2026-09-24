import axios from 'axios';
import { showToast } from '@/lib/toast';

interface StatusMessageConfig {
    message: string;
    // some statuses (e.g. validation errors) carry a safe, specific message
    // from the server that's worth showing instead of the generic fallback
    useServerMessage?: boolean;
}

export function handleAuthError(
    error: unknown,
    statusMessages: Record<number, StatusMessageConfig>,
    fallbackMessage: string
) {
    if (!axios.isAxiosError(error)) return;

    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;
    const config = status !== undefined ? statusMessages[status] : undefined;

    if (!config) {
        showToast.error(fallbackMessage);
        return;
    }

    showToast.error(config.useServerMessage && serverMessage ? serverMessage : config.message);
}
