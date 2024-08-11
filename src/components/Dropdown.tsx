import React from 'react';

interface DropdownProps {
    options: string[];
    onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
    return (
        <select onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
