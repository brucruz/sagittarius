import { Calendar, DateInput, DateSelectorContainer } from "@/styles/components/molecules/DateSelector";
import { useCallback, useRef, useState } from "react";
import DayPicker from "react-day-picker";
import 'react-day-picker/lib/style.css';

import { format } from 'date-fns'

import { MdDateRange } from "react-icons/md";

interface DateSelectorProps {
  label?: string;
  name: string;
  startDate: Date;
  getSelectedDate?: (date: Date) => void;
  getTypedDate?: (date: string) => void;
  calendar?: boolean;
}

const DateSelector = ({ name, label, startDate, getSelectedDate, getTypedDate, calendar = true }: DateSelectorProps) => {
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

    getTypedDate(inputRef.current.value);

    getSelectedDate(date);

    setSelectedDate(date);

    setIsActive(false);
  }, [selectedDate]);

  return (
    <DateSelectorContainer
    >
      {label && (<label htmlFor={name}>{label}</label>)}

      <DateInput
        isFocused={isActive}
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
    </DateSelectorContainer>
  )
};

export default DateSelector;
