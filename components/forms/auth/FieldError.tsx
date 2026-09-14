interface FieldErrorProps {
    errors: any[];
    isTouched: boolean;
}

// Shared validation-error line for every auth form field.
export default function FieldError({ errors, isTouched }: FieldErrorProps) {
    if (!isTouched || !errors?.[0]) return null;
    return <p className="font-sans text-red-500 text-[12px] mt-1.5">{errors[0].message}</p>;
}
