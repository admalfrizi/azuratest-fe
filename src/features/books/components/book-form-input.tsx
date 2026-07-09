import { Controller, type Control } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import type { BookFormValues } from "../../../lib/validations";

interface FormInputProps {
    control: Control<BookFormValues>;
    name: keyof BookFormValues;
    label: string;        
    isPending: boolean;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    min?: number | string;
}

export function BookFormInput({ 
    control,
    name, 
    label, 
    isPending,
    placeholder, 
    type = "text", 
    min 
}: FormInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>
                        {label}
                    </FieldLabel>
                    <Input
                        className="p-5"
                        {...field}
                        id={name}
                        type={type}
                        min={min}
                        value={field.value === undefined ? "" : field.value}
                        aria-invalid={fieldState.invalid}
                        placeholder={placeholder}
                        autoComplete="off"
                        disabled={isPending}
                        onChange={(e) => {
                            if (type === "number") {
                                const value = e.target.value === "" ? "" : Number(e.target.value);
                                field.onChange(value);
                            } else {
                                field.onChange(e.target.value);
                            }
                        }}
                    />
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}