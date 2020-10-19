import Exam from '@/@types/Exam';
import { InputContainer, UserInput, InputIcon, InputTextArea, SuggestionArea } from '@/styles/components/atom/Input';
import { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';

import { MdAdd } from 'react-icons/md';

type SuggestionProps = {
  type: 'exams',
  data: Exam[],
} |
{
  type: 'address',
  data: object[],
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  icon?: any;
  suggestions?: SuggestionProps;
}

const Input = ({
  name,
  label,
  icon: Icon,
  disabled,
  suggestions,
  ...rest
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [hasSuggestions, setHasSuggestions] = useState(false);

  const handleInputFocus = useCallback(() => {


    inputRef.current?.focus();

    setIsFocused(true);

    suggestions && setHasSuggestions(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);

    setHasSuggestions(false);
  }, [inputRef]);

  const handleInputChange = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);

    suggestions && setHasSuggestions(true);
  } , []);

  return (
    <InputContainer
      onFocus={handleInputFocus}
    >
      <UserInput
        // isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        onClick={handleInputFocus}
        hasSuggestions={hasSuggestions}
      >
        <InputIcon>
          {Icon && <Icon />}
        </InputIcon>

        <InputTextArea>
          <label htmlFor={name}>{label}</label>

          <input type="text" id={name} onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChange} ref={inputRef}/>
        </InputTextArea>
      </UserInput>

      {hasSuggestions && suggestions.type === 'exams' && (
        <SuggestionArea>
          {suggestions.data.map(exam => (
            <article key={exam.id}>
              <p>{exam.title}</p>
              <MdAdd />
            </article>
          ))}
        </SuggestionArea>
      )}
    </InputContainer>
  );
};

export default Input;
