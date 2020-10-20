import Exam from '@/@types/Exam';
import { InputContainer, UserInput, InputIcon, InputTextArea, SuggestionArea } from '@/styles/components/atom/Input';
import { InputHTMLAttributes, useCallback, useRef, useState } from 'react';

import { MdAdd } from 'react-icons/md';
import { getGeocode, getLatLng, Suggestion } from 'use-places-autocomplete';

type SuggestionProps = {
  type: 'exams',
  data: Exam[],
  getSelectedExam?(exam: Exam): void,
} |
{
  type: 'address',
  data: Suggestion[],
  getSelectedAddress: (val: string, shouldFetchData?: boolean) => void,
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  icon?: any;
  suggestions?: SuggestionProps;
  getInputValue?(value: string): void;
}

const Input = ({
  name,
  label,
  icon: Icon,
  disabled,
  suggestions,
  getInputValue,
  value,
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

  // const handleInputBlur = useCallback(() => {
  //   setIsFocused(false);

  //   setIsFilled(!!inputRef.current?.value);

  //   setHasSuggestions(false);
  // }, [inputRef]);

  const handleInputChange = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);

    getInputValue(inputRef.current?.value);

    suggestions && setHasSuggestions(true);
  } , []);

  const handlePlaceSelect = (address: string) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    // setHasAddress(true);
    suggestions.type === 'address' && suggestions.getSelectedAddress(address, false);

    setHasSuggestions(false);

    // Get latitude and longitude via utility functions
    getGeocode({
      address,
    })
      .then(placeResults => getLatLng(placeResults[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng });

        // addAddress({
        //   address: description,
        //   latitude: lat,
        //   longitude: lng,
        // });

        // user && mixpanel.identify(user.id);
        // mixpanel.track('Add Address To Search', {
        //   Address: description,
        // });
      })
      .catch(error => {
        console.log('😱 Error: ', error);
      });
  };

  return (
    <InputContainer
      onFocus={handleInputFocus}
      // onBlur={handleInputBlur}
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

          <input type="text" id={name} onChange={handleInputChange} ref={inputRef} value={value}/>
        </InputTextArea>
      </UserInput>

      {hasSuggestions && suggestions.type === 'exams' && (
        <SuggestionArea>
          {suggestions.data.map(exam => (
            <article key={exam.id} onClick={() => suggestions.getSelectedExam(exam)}>
              <p>{exam.title}</p>
              <MdAdd />
            </article>
          ))}
        </SuggestionArea>
      )}

      {hasSuggestions && suggestions.type === 'address' && (
        <SuggestionArea>
          {suggestions.data.map(suggestion => {
            const { place_id, structured_formatting: { main_text, secondary_text } } = suggestion;
            const addressText = `${main_text} ${secondary_text}`;
            return (
              <article key={place_id} onClick={handlePlaceSelect(addressText)}>
                <p>{addressText}</p>
                <MdAdd />
              </article>
            );
          })}
        </SuggestionArea>
      )}
    </InputContainer>
  );
};

export default Input;
