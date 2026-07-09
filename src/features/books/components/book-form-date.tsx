import { Controller, type Control } from "react-hook-form";
import { format } from "date-fns";
import { id } from "date-fns/locale"; // Optional: For Indonesian date formatting
import { CalendarIcon } from "lucide-react";

import { Field, FieldError, FieldLabel } from "../../../components/ui/field";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "../../../lib/utils";
import type { BookFormValues } from "../../../lib/validations";

interface FormDateProps {
    control: Control<BookFormValues>;
    name: keyof BookFormValues;
    label: string;
    isPending: boolean;
    placeholder?: string;
}

export function BookFormDate({
    control,
    name,
    label,
    isPending,
    placeholder = "Pilih tanggal",
}: FormDateProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>
                        {label}
                    </FieldLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id={name}
                                variant={"outline"}
                                disabled={isPending}
                                className={cn(
                                    "w-full justify-start text-left font-normal bg-white p-5",
                                    !field.value && "text-muted-foreground",
                                    fieldState.invalid && "border-red-500 focus-visible:ring-red-500"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                    format(new Date(field.value), "PPP", { locale: id }) 
                                ) : (
                                    <span>{placeholder}</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => {
                                    field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                                }}
                                disabled={isPending}
                                captionLayout="dropdown"
                            />
                        </PopoverContent>
                    </Popover>

                    {fieldState.invalid && fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}