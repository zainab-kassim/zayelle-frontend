import { z } from 'zod';
 
// Sign-up form validation schema
export const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(12, 'Password must be at least 12 characters'),
  agreeToPolicy: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the privacy policy',
  }),
});
 
export type SignUpFormData = z.infer<typeof signUpSchema>;
 
// Login form validation schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(12, 'Password must be at least 12 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Forgot-password form (request a reset link)
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset-password form (set a new password from the emailed link)
export const resetPasswordSchema = z
  .object({
    password: z.string().min(12, 'Password must be at least 12 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;