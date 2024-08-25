import React, { HTMLInputTypeAttribute } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import signInSchema from "@/schemas/Auth";

const formSchema = signInSchema("sign-up");
interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
}

const CustomInput = ({
  control,
  label,
  placeholder,
  type,
  name,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
