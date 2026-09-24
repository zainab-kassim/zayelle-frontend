'use client';

import { motion } from 'framer-motion';
import CloseIcon from '@/components/ui/CloseIcon';

type ToastVariant = 'success' | 'error';

interface CustomToastProps {
    variant: ToastVariant;
    message: string;
    onDismiss: () => void;
}

const variantStyles: Record<ToastVariant, { accent: string; iconBg: string; icon: React.ReactNode }> = {
    success: {
        accent: 'text-[#3F6C4E]',
        iconBg: 'bg-[#3F6C4E]/10',
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
            </svg>
        ),
    },
    error: {
        accent: 'text-red-600',
        iconBg: 'bg-red-600/10',
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4M12 17h.01" />
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            </svg>
        ),
    },
};

export default function CustomToast({ variant, message, onDismiss }: CustomToastProps) {
    const { accent, iconBg, icon } = variantStyles[variant];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-start gap-3 w-[320px] sm:w-[360px] bg-paper border border-line rounded-xl shadow-[0_12px_28px_rgba(23,23,26,0.1)] px-4 py-3.5"
        >
            <span className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full ${iconBg} ${accent}`}>
                {icon}
            </span>

            <p className="flex-1 font-sans text-[13px] leading-snug font-medium text-ink pt-1">
                {message}
            </p>

            <button
                onClick={onDismiss}
                aria-label="Dismiss notification"
                className="flex-shrink-0 mt-1 text-muted hover:text-ink transition-colors duration-150"
            >
                <CloseIcon size={14} strokeWidth={2} />
            </button>
        </motion.div>
    );
}
