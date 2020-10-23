import Checkbox from "@/components/atom/Checkbox";
import CheckboxGroup from "@/components/molecule/CheckboxGroup";
import DateSelector from "@/components/molecule/DateSelector";
import PageTemplate from "@/components/templates/PageTemplate";
import { CheckboxItem } from "@/styles/components/atom/Checkbox";
import { DateRange, HourSelection
} from "@/styles/pages/DateSelectionPage";
import { useCallback, useMemo, useState } from "react";
import { MdCheck } from "react-icons/md";

const DateSelectionPage = () => {
  const [fromDate, setFromDate] = useState<Date>(null);
  const [toDate, setToDate] = useState<Date>(null);

  const toStartDate = useMemo(() => {
    return fromDate ? fromDate : new Date();
  }, [fromDate]);

  const getFromDate = useCallback((date: Date) => {
    setFromDate(date);
  }, []);

  const getToDate = useCallback((date: Date) => {
    setToDate(date);
  }, []);

  return (
    <PageTemplate
      titleMain={{
        title: 'Entre quais dias ficaria melhor?',
        subTitle: 'Selecione as datas que pretende realizar os exames.'
      }}
      backLinkUrl='/patients'
    >

      <DateRange>
        <DateSelector name='fromDate' label='A partir de:' startDate={new Date()} getSelectedDate={getFromDate}/>

        <DateSelector name='toDate'label='Até:' startDate={toStartDate} getSelectedDate={getToDate}/>
      </DateRange>

      <HourSelection>
        <h3>Selecione os horários preferíveis:</h3>

        <CheckboxGroup />
      </HourSelection>


    </PageTemplate>
  )
};

export default DateSelectionPage;
