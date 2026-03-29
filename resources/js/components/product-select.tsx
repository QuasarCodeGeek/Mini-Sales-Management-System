import React from "react";
import Select from "react-select";

type OptionType = {
    id: number;
    name: string;
    stock: number;
    price: number;
    sku: string;
    isDisabled?: boolean;
};

interface SelectProps {
    options: OptionType[];
    value: OptionType | null;
    onChange: (option: OptionType | null) => void;
    placeholder?: string;
}

export const ProductSelect: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select ...",
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
        getOptionValue={(option) => option.sku.toString()}
        formatOptionLabel={(option: OptionType) => (
            <div className={` ${option.stock <= 0 ? 'bg-neutral-200 dark:bg-neutral-800': ''} flex items-center justify-between w-full p-2`}>
            
                {/* LEFT: ID + Name */}
                <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-400">
                    [{option.sku}]
                    </span>
                    <span className="text-sm">
                    {option.name} ₱{option.price}
                    </span>
                </div>

                {/* RIGHT: Stock Status */}
                {option.stock > 10 ? (
                    <span className="text-xs text-green-500">
                    {option.stock}
                    </span>
                ) : option.stock <=10 ? (
                    <span className="text-xs text-yellow-500">
                    Low Stock: {option.stock}
                    </span>
                ) : (
                    <span className="text-xs text-red-500">
                    Out of Stock
                    </span>
                )}
            </div>
        )}
        classNames={{
            control: () => "w-full border rounded-md px-2 py-1 bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700",
            menu: () => "w-full mt-1 rounded-md border bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 shadow-lg",
            // option: ({ isFocused, isSelected }) =>
            // `px-2 py-1 cursor-pointer ${
            //     isSelected
            //     ? "bg-blue-500 text-white"
            //     : isFocused
            //     ? "bg-gray-100 dark:bg-neutral-800"
            //     : "text-black dark:text-white"
            // }`,
            input: () => "text-black dark:text-white",
            singleValue: () => "text-black dark:text-white",
            placeholder: () => "text-gray-400",
            dropdownIndicator: () => "text-gray-500 dark:text-gray-400",
            clearIndicator: () => "text-gray-500 dark:text-gray-400",
        }}
        />
    );
};