'use client';

export interface FilterOption {
  categoryID: string;
  name: string;
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
        <label key={option.categoryID}>
          <input 
            type="radio" 
            name="filter" 
            checked={activeOption === option.categoryID}
            onChange={() => onOptionChange(option.categoryID)}
          />
          <i>{option.name}</i>
        </label>
      ))}
    </div>
  );
}; 