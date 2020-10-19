import location from '@/assets/components/atoms/Input/location.svg';
import { InputContainer, InputIcon, InputTextArea } from '@/styles/components/atom/Input';
import { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  // icon?: ;
}

const Input = ({
  name,
  label,
  ...rest
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, [inputRef]);

  return (
    <InputContainer
      // isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      onClick={handleInputFocus}
    >
      <InputIcon>
        <img src={location} alt="localização"/>
      </InputIcon>

      <InputTextArea>
        <label htmlFor={name}>{label}</label>

        <input type="text" id={name} onFocus={handleInputFocus} onBlur={handleInputBlur}/>
      </InputTextArea>
    </InputContainer>
  );
};

export default Input;
