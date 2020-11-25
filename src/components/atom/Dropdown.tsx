import { useState, ReactElement, useCallback, HTMLAttributes } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import {
  Base,
  Options,
  Option,
  Select,
} from '@/styles/components/atom/Dropdown';

interface option {
  id: string | number;
  value: string | number;
  label: string;
}

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  options: option[];
  defaultValue?: string;
  type?: 'small' | 'medium' | 'large';
}

const Dropdown = ({
  options,
  defaultValue,
  type = 'large',
  ...rest
}: DropdownProps): ReactElement => {
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
    <Base {...rest}>
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
        <Options type={type}>
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
