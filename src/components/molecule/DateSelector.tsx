import { Calendar, DateInput, DateSelectorContainer } from "@/styles/components/molecules/DateSelector";
import { useCallback, useMemo, useRef, useState } from "react";
import DayPicker from "react-day-picker";
import 'react-day-picker/lib/style.css';

import { format } from 'date-fns'

import { MdDateRange } from "react-icons/md";

interface DateSelectorProps {
  label?: string;
  name: string;
  startDate: Date;
  getSelectedDate: (date: Date) => void;
}

const DateSelector = ({ name, label, startDate, getSelectedDate }: DateSelectorProps) => {
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
    >
      {label && (<label htmlFor={name}>{label}</label>)}

      <DateInput
        isFocused={isActive}
        onClick={handleInputClick}
      >
        <MdDateRange />
        <input type="text" id={name} ref={inputRef} placeholder='dd/mm/aaaa'/>
      </DateInput>

      {isActive && (
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
