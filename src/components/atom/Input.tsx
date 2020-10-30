import { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import mixpanel from 'mixpanel-browser';

import { MdAdd, MdClose, MdKeyboardArrowDown, MdKeyboardArrowUp, MdRemoveRedEye } from 'react-icons/md';
import { getGeocode, getLatLng, Suggestion } from 'use-places-autocomplete';

import Exam from '@/@types/Exam';
import { useSearchExam } from '@/hooks/searchExam';
import { InputContainer, UserInput, InputIcon, InputTextArea, SuggestionArea, SelectedExams, SelectedExamsSummary, SelectedExamsDetail, ErrorMessage } from '@/styles/components/atom/Input';
import useClickOutsideRef from '@/hooks/clickOutside';
import { useAuth } from '@/hooks/auth';

import { useField } from '@unform/core';

type SuggestionProps = {
  type: 'exams',
  data: Exam[],
  getSelectedExam: (exam: Exam) => void,
  clearSuggestions: () => void,
} |
{
  type: 'address',
  data: Suggestion[],
  getSelectedAddress: (val: string, shouldFetchData?: boolean) => void,
  clearSuggestions: () => void,
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  icon?: any;
  type?: string,
  suggestions?: SuggestionProps;
  getInputValue?(value: string): void;
  isSubmit?:boolean,
}

const Input = ({
  name,
  label,
  icon: Icon,
  suggestions,
  type,
  getInputValue,
  value,
  isSubmit,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [hasSuggestions, setHasSuggestions] = useState(false);
  const [isOpenSelectedExams, setIsOpenSelectedExams] = useState(false);
  const [inputType, setInputType] = useState('text');

  const { addAddress, addExam, exams, removeExam, address } = useSearchExam();
  const { user } = useAuth();

  useEffect(() => {
    inputRef.current.value && setIsFilled(true);
    setInputType(type);
  }, [suggestions, inputRef]);

  const { error } = isSubmit ? useField(name) : { error: '' };

  if(isSubmit) {
    const { fieldName, registerField } = useField(name);
    useEffect(() => {

      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
      });

    }, [fieldName, registerField])
  }

  const handleInputFocus = useCallback(() => {
    inputRef.current?.focus();

    setIsFocused(true);

    suggestions && setHasSuggestions(true);
  }, []);

  const handleClickOutsideInput = useCallback(() => {
    if(!suggestions) return;
    setIsFocused(false);

    inputRef.current.value = '';

    getInputValue('');

    !value && setIsFilled(false);

    setHasSuggestions(false);
  }, [inputRef]);

  const handleClickOutsideSelectedExams = useCallback(() => {
    setIsOpenSelectedExams(false);
  }, []);

  const handleInputChange = useCallback(() => {
    setIsFilled(!!inputRef.current?.value);

    suggestions && getInputValue(inputRef.current?.value);

    suggestions && setHasSuggestions(true);
  } , []);

  const handlePlaceSelect = useCallback((address: string) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    // setHasAddress(true);
    suggestions.type === 'address' && suggestions.getSelectedAddress(address);

    setHasSuggestions(false);

    suggestions.type === "address" && suggestions.clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({
      address,
    })
      .then(placeResults => getLatLng(placeResults[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng });

        addAddress({
          address,
          latitude: lat,
          longitude: lng,
        });

        user && mixpanel.identify(user.id);
        mixpanel.track('Add Address To Search', {
          Address: address,
          Latitude: lat,
          Longitude: lng,
        });
      })
      .catch(error => {
        console.log('😱 Error: ', error);
      });
  }, [suggestions, user]);

  const handleExamSelect = useCallback((exam: Exam) => {
    addExam(exam);

    setHasSuggestions(false);
    suggestions.type === "exams" && suggestions.clearSuggestions;

    inputRef.current.value = '';
    setIsFilled(false);

    // ReactGA.event({
    //   category: 'search',
    //   action: 'click',
    //   label: user
    //     ? `UserId ${user.id} - Added ${clickedExam.title} to search params`
    //     : `Unknown user - Added ${clickedExam.title} to search params`,
    // });

    user && mixpanel.identify(user.id);
    mixpanel.track('Add Exam To Search', {
      Exam: exam.title,
    });
  }, [suggestions, addExam, user]);

  const handleExamRemove = useCallback((exam: Exam) => {
    exams.length === 0 && setIsOpenSelectedExams(false);

    user && mixpanel.identify(user.id);
    mixpanel.track('Remove Exam From Search', {
      Exam: exam.title,
    });

    removeExam(exam.id);
  }, [exams, removeExam, user]);

  const clickOutsideUserInputRef = useClickOutsideRef(handleClickOutsideInput);
  const clickOutsideUserSelectedExams = useClickOutsideRef(handleClickOutsideSelectedExams);

  return (
    <InputContainer>
      <UserInput
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        onFocus={handleInputFocus}
        hasSuggestions={hasSuggestions}
        ref={clickOutsideUserInputRef}
      >
        <InputIcon>
          {Icon && <Icon />}
        </InputIcon>

        <InputTextArea>
          <label htmlFor={name}>{label}</label>

          <input type={type ? inputType : 'text'} id={name} name={name} onChange={handleInputChange} ref={inputRef} value={value}/>
        </InputTextArea>

        {type === 'password' &&
          <MdRemoveRedEye
            className="password-eye-icon"
            onClick={() => inputRef.current?.value && (inputType === 'password' ? setInputType('text') : setInputType('password'))}
          />
        }
      </UserInput>

      {hasSuggestions && suggestions.type === 'exams' && (
        <SuggestionArea>
          {suggestions.data.map(exam => (
            <article key={exam.id} onClick={() => handleExamSelect(exam)}>
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

      <SelectedExams
        ref={clickOutsideUserSelectedExams}
      >
        {exams?.length > 0 && suggestions?.type === 'exams' && (
          <SelectedExamsSummary onClick={() => setIsOpenSelectedExams(!isOpenSelectedExams)}>
            {exams.length === 1 ? (<p>1 exame selecionado</p>) : (<p>{exams.length} exames selecionados</p>)}
            <button type="button" onClick={() => setIsOpenSelectedExams(!isOpenSelectedExams)}>
              {isOpenSelectedExams ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
          </SelectedExamsSummary>
        )}

        {isOpenSelectedExams && (
            <SelectedExamsDetail>
              {exams.map(exam => (
                <article key={exam.id}>
                  <p>{exam.title}</p>
                  <MdClose onClick={() => handleExamRemove(exam)}/>
                </article>
              ))}
            </SelectedExamsDetail>
          )}
        </SelectedExams>

        {error && (
          <ErrorMessage>
            <p>{error} <span>Tente novamente.</span></p>
          </ErrorMessage>
        )}
    </InputContainer>
  );
};

export default Input;
