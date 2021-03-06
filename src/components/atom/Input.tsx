/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  ReactElement,
  useRef,
  useState,
  memo,
} from 'react';
import mixpanel from 'mixpanel-browser';
import InputMask from 'react-input-mask';
import { MdRemoveRedEye } from 'react-icons/md';
import { Suggestion } from 'use-places-autocomplete';
import { EXAMS as EXAMS_CONSTANT } from '@/constants/examsSearch';

import Exam from '@/@types/Exam';
import {
  InputContainer,
  UserInput,
  InputIcon,
  InputTextArea,
  ErrorMessage,
} from '@/styles/components/atom/Input';
import { useAuth } from '@/hooks/auth';

import { useField } from '@unform/core';

export type SuggestionProps =
  | {
      type: 'exams';
      data: Exam[];
      getSelectedExam: (exam: Exam) => void;
      clearSuggestions: () => void;
    }
  | {
      type: 'address';
      data: Suggestion[];
      getSelectedAddress: (val: string, shouldFetchData?: boolean) => void;
      clearSuggestions: () => void;
    };
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errorProps?: string;
  label: string;
  icon?: any;
  type?: string;
  suggestions?: SuggestionProps;
  isSubmit?: boolean;
  mask?: string;
  iconAfter?: string;
  disabled?: boolean;
}

const Input = ({
  name,
  label,
  icon: Icon,
  errorProps = '',
  suggestions,
  type,
  value,
  isSubmit,
  mask,
  iconAfter,
  disabled,
  ...rest
}: InputProps): ReactElement => {
  const inputRef = useRef(null);
  const userInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [hasSuggestions, setHasSuggestions] = useState(false);
  const [inputType, setInputType] = useState('text');

  const { user } = useAuth();

  useEffect(() => {
    inputRef.current?.value && setIsFilled(true);
    setInputType(type);
  }, [suggestions, inputRef, type]);

  useEffect(() => {
    setIsFilled(!!value);
  }, [value]);

  const { error } = isSubmit ? useField(name) : { error: errorProps };

  if (isSubmit) {
    const { fieldName, registerField } = useField(name);
    useEffect(() => {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });
    }, [fieldName, registerField]);
  }

  const handleInputFocus = useCallback(() => {
    userInputRef.current.querySelector('input').focus();

    setIsFocused(true);

    suggestions && setHasSuggestions(true);
  }, [suggestions]);

  const handleInputChange = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);
  }, []);

  user && mixpanel.identify(user.id);
  mixpanel.track_links(
    '#Whatsapp_Exam_Not_Found',
    'Exam Not Found - Whatsapp Click',
  );

  return (
    <InputContainer>
      <UserInput
        ref={userInputRef}
        isErrored={!!error}
        isFilled={isFilled}
        data-testid="atom-user-input"
        isFocused={isFocused}
        isDisabled={disabled}
        onFocus={handleInputFocus}
        hasSuggestions={hasSuggestions}
        {...rest}
      >
        <InputIcon>{Icon && <Icon data-testid="atom-icon-input" />}</InputIcon>

        <InputTextArea>
          <label htmlFor={name}>{label}</label>

          <InputMask
            type={type ? inputType : 'text'}
            data-testid="atom-input"
            id={name}
            name={name}
            disabled={disabled}
            onChange={handleInputChange}
            ref={inputRef}
            value={value}
            mask={mask}
          />
        </InputTextArea>

        {iconAfter && (
          <img
            className="icon-after-input"
            src={iconAfter}
            alt="Ícone"
            data-testid="atom-icon-after-input"
          />
        )}

        {type === 'password' && (
          <MdRemoveRedEye
            data-testid="atom-password-icon"
            className="password-eye-icon"
            onClick={() =>
              inputRef.current?.value &&
              (inputType === 'password'
                ? setInputType('text')
                : setInputType('password'))
            }
          />
        )}
      </UserInput>

      {error && (
        <ErrorMessage>
          <p>
            {error}{' '}
            {suggestions?.type === EXAMS_CONSTANT ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                id="Whatsapp_Exam_Not_Found"
                href="https://api.whatsapp.com/send?phone=5511936186364"
              >
                Clique aqui para te ajudarmos.
              </a>
            ) : (
              <span>Tente novamente.</span>
            )}
          </p>
        </ErrorMessage>
      )}
    </InputContainer>
  );
};

export default memo(Input);
