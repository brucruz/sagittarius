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
  onModal?: boolean;
  value?: string | number;
  setValue?: (args: any) => void;
}

const Dropdown = ({
  options,
  defaultValue,
  type = 'large',
  onModal = false,
  value = '',
  setValue,
  ...rest
}: DropdownProps): ReactElement => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleChangeValue = useCallback(
    optionValue => {
      setCurrentValue(optionValue);
      setIsDropdownOpen(false);
      setValue && setValue(optionValue);
    },
    [setCurrentValue, setIsDropdownOpen, setValue],
  );

  return (
    <Base {...rest}>
      <Select>
        <span>{currentValue || defaultValue}</span>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {isDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
      </Select>
      {isDropdownOpen && (
        <Options type={type} onModal={onModal}>
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
