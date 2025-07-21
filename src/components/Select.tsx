"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleOptionClick = (optionValue: string): void => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative ">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full p-3 cursor-pointer bg-white/10 border-2 border-white/30 rounded-lg text-white text-left flex items-center justify-between hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute  top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-10 overflow-hidden"
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className="w-full p-3 cursor-pointer text-left text-gray-800 hover:bg-blue-100 transition-colors border-b border-gray-100 last:border-b-0"
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
