import React from "react";
import Select from "react-select";

export type OptionType = {
    id: number | string;
    name: string;
    isDisabled?: boolean;
};

interface GenericSelectProps {
    options: OptionType[];
    value: OptionType | null;
    onChange: (option: OptionType | null) => void;
    placeholder?: string;
}

export const GenericSelect: React.FC<GenericSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select...",
}) => {
    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            isOptionDisabled={(option) => option.isDisabled ?? false}
            unstyled
            placeholder={placeholder}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id.toString()}
            formatOptionLabel={(option: OptionType) => (
                <div className="flex items-center gap-2 w-full p-2">
                <span className="text-sm text-gray-400">[{option.id}]</span>
                <span className="text-sm">{option.name}</span>
                </div>
            )}
            classNames={{
                control: () =>
                "w-full border rounded-md px-2 py-1 bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700",
                menu: () =>
                "w-full mt-1 rounded-md border bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 shadow-lg",
                // option: ({ isFocused, isSelected }) =>
                //   `px-2 py-1 cursor-pointer ${
                //     isSelected
                //       ? "bg-blue-500 text-white"
                //       : isFocused
                //       ? "bg-gray-100 dark:bg-neutral-800"
                //       : "text-black dark:text-white"
                //   }`,
                input: () => "text-black dark:text-white",
                singleValue: () => "text-black dark:text-white",
                placeholder: () => "text-gray-400",
                dropdownIndicator: () => "text-gray-500 dark:text-gray-400",
                clearIndicator: () => "text-gray-500 dark:text-gray-400",
            }}
        />
    );
};