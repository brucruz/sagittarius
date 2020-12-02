/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  ReactElement,
  useCallback,
  useEffect,
  useState,
  InputHTMLAttributes,
} from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import Input, { SuggestionProps } from '@/components/atom/Input';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { SuggestionArea } from '@/styles/components/molecules/InputWithSuggestion';
import {
  EXAMS as EXAMS_CONSTANT,
  ADDRESS as ADDRESS_CONSTANT,
} from '@/constants/examsSearch';
import { useSearchExam } from '@/hooks/searchExam';
import { useAuth } from '@/hooks/auth';
import Exam from '@/@types/Exam';
import mixpanel from 'mixpanel-browser';

interface InputWithSuggestionsProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  suggestions: SuggestionProps;
  getInputValue?(value: string): void;
  error?: string;
}

const InputWithSuggestions = ({
  name,
  label,
  suggestions,
  getInputValue,
  error,
  value,
}: InputWithSuggestionsProps): ReactElement => {
  const { addExam, addAddress, address } = useSearchExam();

  const { user } = useAuth();

  const [hasSuggestions, setHasSuggestions] = useState(false);

  useEffect(() => {
    if (
      suggestions.type === ADDRESS_CONSTANT &&
      (address.address === value || value === '')
    ) {
      setHasSuggestions(false);
      return;
    }

    if (suggestions.data.length > 0) {
      setHasSuggestions(true);
    } else {
      setHasSuggestions(false);
    }
  }, [address.address, suggestions, value]);

  const handlePlaceSelect = useCallback(
    (address: string) => () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter as "false"
      // setHasAddress(true);
      suggestions.type === 'address' && suggestions.getSelectedAddress(address);

      setHasSuggestions(false);

      suggestions.type === 'address' && suggestions.clearSuggestions();

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
    },
    [suggestions, user, addAddress],
  );

  const handleExamSelect = useCallback(
    (exam: Exam) => {
      addExam(exam);

      setHasSuggestions(false);
      suggestions.type === EXAMS_CONSTANT && suggestions.clearSuggestions();
      getInputValue('');

      user && mixpanel.identify(user.id);
      mixpanel.track('Add Exam To Search', {
        Exam: exam.title,
      });
    },
    [addExam, suggestions, getInputValue, user],
  );

  return (
    <div>
      <Input
        name={name}
        label={label}
        errorProps={error}
        icon={MdSearch}
        value={value}
        suggestions={suggestions}
        onChange={event => getInputValue(event.target.value)}
      />

      {hasSuggestions && suggestions.type === EXAMS_CONSTANT && (
        <SuggestionArea>
          {suggestions.data.map(exam => (
            <article key={exam.id} onClick={() => handleExamSelect(exam)}>
              <p>{exam.title}</p>
              <MdAdd />
            </article>
          ))}
        </SuggestionArea>
      )}

      {hasSuggestions && suggestions.type === ADDRESS_CONSTANT && (
        <SuggestionArea>
          {suggestions.data.map(suggestion => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;
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
    </div>
  );
};

export default InputWithSuggestions;
