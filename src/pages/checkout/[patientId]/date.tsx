import { useCallback, useEffect, useMemo, useState } from "react";

import ButtonNext from "@/components/atom/ButtonNext";
import CheckboxGroup from "@/components/molecule/CheckboxGroup";
import DateSelector from "@/components/molecule/DateSelector";
import PageTemplate from "@/components/templates/PageTemplate";
import hoursCheckboxes from "@/contents/pages/DateSelectionPage/hoursCheckboxes";
import { DateRange, HourSelection } from "@/styles/pages/DateSelectionPage";
import { useDates } from '@/hooks/dates';

const DateSelectionPage = () => {
  const [fromDate, setFromDate] = useState<Date>(null);
  const [toDate, setToDate] = useState<Date>(null);

  const { preferredDateFrom, preferredDateTo, selectPreferredFromDate, selectPreferredToDate } = useDates();

  console.log('from', preferredDateFrom);
  console.log('to', preferredDateTo);

  const toStartDate = useMemo(() => {
    return fromDate ? fromDate : new Date();
  }, [fromDate]);

  const getFromDate = useCallback((date: Date) => {
    selectPreferredFromDate(date);
    setFromDate(date);
  }, []);

  const getToDate = useCallback((date: Date) => {
    selectPreferredToDate(date);
    setToDate(date);
  }, []);

  return (
    <PageTemplate
      titleMain={{
        title: 'Entre quais dias ficaria melhor?',
        subTitle: 'Selecione as datas que pretende realizar os exames.'
      }}
      buttonType={{
        type: 'link',
        backLinkUrl: '/checkout/patients'
      }}
    >

      <DateRange>
        <DateSelector name='fromDate' label='A partir de:' startDate={new Date()} getSelectedDate={getFromDate}/>

        <DateSelector name='toDate'label='Até:' startDate={toStartDate} getSelectedDate={getToDate}/>
      </DateRange>

      <HourSelection>
        <h3>Selecione os horários preferíveis:</h3>

        {hoursCheckboxes && hoursCheckboxes.map(hour => (
          <CheckboxGroup title={hour.period} checkboxes={hour.hours}/>
        ))}
      </HourSelection>

      <ButtonNext text='Continuar' />
    </PageTemplate>
  )
};

export default DateSelectionPage;
