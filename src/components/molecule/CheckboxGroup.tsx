import { GroupContainer } from '@/styles/components/molecules/CheckboxGroup';
import { memo, ReactElement, useCallback, useState } from 'react';
import Checkbox, { CheckboxType } from '../atom/Checkbox';

interface CheckboxGroupProps {
  title?: string;
  checkboxes: CheckboxType[];
}

const CheckboxGroup = ({
  title,
  checkboxes,
}: CheckboxGroupProps): ReactElement => {
  const [checkboxItems, setCheckboxItems] = useState<CheckboxType[]>(
    checkboxes,
  );

  const handleCheckboxChange = useCallback((checkbox: CheckboxType) => {
    // const modifiedItems = checkboxItems.map(item => {
    //   item.id === checkbox.id ? item.isChecked = !checkbox.isChecked : item = item;

    //   return item;
    // });

    setCheckboxItems(markedCheckboxes => [...markedCheckboxes, checkbox]);
  }, []);

  return (
    <GroupContainer>
      {title && <h4>{title}</h4>}

      <div>
        {checkboxes &&
          checkboxes.map(checkbox => (
            <Checkbox
              label={checkbox.label}
              isChecked={checkbox.isChecked}
              key={checkbox.label}
              id={checkbox.id}
              onChange={() => handleCheckboxChange(checkbox)}
            />
          ))}
      </div>
    </GroupContainer>
  );
};

export default memo(CheckboxGroup);
