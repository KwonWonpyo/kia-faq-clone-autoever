'use client';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterProps {
  options: FilterOption[];
  activeOption: string;
  onOptionChange: (optionId: string) => void;
}

export const Filter = ({ options, activeOption, onOptionChange }: FilterProps) => {
  return (
    <div className="filter">
      {options.map((option) => (
        <label key={option.id}>
          <input 
            type="radio" 
            name="filter" 
            checked={activeOption === option.id}
            onChange={() => onOptionChange(option.id)}
          />
          <i>{option.label}</i>
        </label>
      ))}
    </div>
  );
}; 