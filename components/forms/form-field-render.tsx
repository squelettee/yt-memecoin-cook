import { FormFieldConfig } from "@/schemas/templateSchema";
import { Input } from "../ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { TemplateFormData } from "@/schemas/templateSchema";
import { Path } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TemplateFormProps {
  onUpdate: (data: TemplateFormData) => void;
  templateData: TemplateFormData;
  subdomain: string;
  files: {
    logoFile: File | null;
    backgroundFile: File | null;
    previewImage: File | null;
  };
  setFiles: React.Dispatch<
    React.SetStateAction<{
      logoFile: File | null;
      backgroundFile: File | null;
      previewImage: File | null;
    }>
  >;
}

export const FormFieldRenderer = ({
  field,
  formField,
  setFiles,
}: {
  field: FormFieldConfig;
  formField: ControllerRenderProps<TemplateFormData, Path<TemplateFormData>>;
  setFiles: TemplateFormProps["setFiles"];
}) => {
  // 📁 File Input
  if (field.type === "file") {
    return (
      <div className="w-full">
        <div className="flex gap-2 items-center">
          <Input
            type="file"
            className="file:mr-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              formField.onChange(file);

              // Update files state based on field ID
              if (field.id === "previewImage") {
                setFiles((prev) => ({ ...prev, previewImage: file }));
              } else if (field.id === "aboutImage") {
                setFiles((prev) => ({ ...prev, backgroundFile: file }));
              } else if (field.id === "logo") {
                setFiles((prev) => ({ ...prev, logoFile: file }));
              }
            }}
          />
          {formField.value && (
            <button
              type="button"
              className="px-2 py-1 text-sm text-red-600 hover:text-red-700 rounded-md hover:bg-red-50"
              onClick={() => {
                formField.onChange(null);
                if (field.id === "previewImage") {
                  setFiles((prev) => ({ ...prev, previewImage: null }));
                } else if (field.id === "aboutImage") {
                  setFiles((prev) => ({ ...prev, backgroundFile: null }));
                } else if (field.id === "logo") {
                  setFiles((prev) => ({ ...prev, logoFile: null }));
                }
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          {...formField}
          checked={formField.value}
          onCheckedChange={(checked) => {
            formField.onChange(checked);
          }}
          className="data-[state=checked]:bg-violet-700"
        />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {field.label}
        </label>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <Select
        value={formField.value}
        onValueChange={(value) => formField.onChange(value)}
      >
        <SelectTrigger className="w-full bg-white/5 backdrop-blur-sm border-violet-200 focus:ring-violet-400">
          <SelectValue placeholder={field.placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-lg border-violet-200">
          {field.options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="hover:bg-violet-50 focus:bg-violet-50"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (field.type === "color") {
    return (
      <div className="flex items-center gap-3">
        <Input
          {...formField}
          type="color"
          className="h-12 w-24 cursor-pointer rounded-lg  transition-colors p-1"
          onChange={(e) => {
            formField.onChange(e.target.value);
          }}
        />
      </div>
    );
  }

  return (
    <Input
      {...formField}
      type={field.type}
      placeholder={field.placeholder}
      onChange={(e) => {
        formField.onChange(e.target.value);
      }}
    />
  );
};
