import { Calendar, DateInput, DateSelectorContainer, ErrorMessage } from "@/styles/components/molecules/DateSelector";
import { InputHTMLAttributes, useCallback, useRef, useState } from "react";
import DayPicker from "react-day-picker";
import 'react-day-picker/lib/style.css';

import { format } from 'date-fns'

import { MdDateRange } from "react-icons/md";

interface DateSelectorProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  startDate: Date;
  getSelectedDate?: (date: Date) => void;
  getTypedDate?: (date: string) => void;
  calendar?: boolean;
  error?: string,
}

const DateSelector = ({ name, label, startDate, getSelectedDate, getTypedDate, calendar = true, error, ...rest }: DateSelectorProps) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(null)

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  const handleDayClick = useCallback((date: Date, { selected, disabled }) => {
    if (disabled) {
      return;
    }

    if (selected) {
      setSelectedDate(null);
      getSelectedDate(null);
      getTypedDate(null);

      inputRef.current.value = null;

      return;
    }

    inputRef.current.value = format(date, 'dd/MM/yyyy');

    getSelectedDate(date);

    setSelectedDate(date);

    setIsActive(false);
  }, [selectedDate]);

  return (
    <DateSelectorContainer
      {...rest}
    >
      {label && (<label htmlFor={name}>{label}</label>)}

      <DateInput
        isFocused={isActive}
        isErrored={!!error}
        onClick={handleInputClick}
        fullWidth={!calendar}
      >
        <MdDateRange />
        <input type="text" id={name} ref={inputRef} placeholder='dd/mm/aaaa' onChange={() => getTypedDate(inputRef.current?.value)}/>
      </DateInput>

      {isActive && calendar && (
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={startDate}
            disabledDays={{
              before: startDate,
            }}
            initialMonth={startDate}
            selectedDays={selectedDate}
            onDayClick={handleDayClick}
            months={[
              'Jan',
              'Fev',
              'Mar',
              'Abr',
              'Mai',
              'Jun',
              'Jul',
              'Ago',
              'Set',
              'Out',
              'Nov',
              'Dez',
            ]}
          />
        </Calendar>
      )}

    {error && (
      <ErrorMessage>
        <p>O formato deve ser como em '01/01/1990'. <span>Tente novamente.</span></p>
      </ErrorMessage>
    )}
    </DateSelectorContainer>
  )
};

export default DateSelector;
