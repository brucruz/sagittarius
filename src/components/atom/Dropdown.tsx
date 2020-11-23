import { useState, ReactElement, useCallback } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import {
  Base,
  Options,
  Option,
  Select,
} from '@/styles/components/atom/Dropdown';

interface option {
  id: string | number;
  value: string;
  label: string;
}

interface DropdownProps {
  options: option[];
  defaultValue?: string;
}

const Dropdown = ({ options, defaultValue }: DropdownProps): ReactElement => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleChangeValue = useCallback(
    optionValue => {
      setValue(optionValue);
      setIsDropdownOpen(false);
    },
    [setValue, setIsDropdownOpen],
  );

  return (
    <Base onBlur={() => setIsDropdownOpen(false)}>
      <Select>
        <span>{value || defaultValue}</span>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {isDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
      </Select>
      {isDropdownOpen && (
        <Options>
          {options.map((currentOption: option) => (
            <Option
              key={currentOption.id}
              onClick={() => handleChangeValue(currentOption.value)}
            >
              <span>{currentOption.label}</span>
            </Option>
          ))}
        </Options>
      )}
    </Base>
  );
};

export default Dropdown;
