import { GroupContainer } from "@/styles/components/molecules/CheckboxGroup";
import { ButtonHTMLAttributes, memo, useCallback, useRef, useState } from "react";
import Checkbox, { CheckboxType } from "../atom/Checkbox";

const checkboxes: CheckboxType[] = [
  {
    // isChecked: true,
    label: 'das 6h às 9h',
    id: 'Manhã - das 6h às 9h'
  },
  {
    // isChecked: false,
    label: 'das 9h às 12h',
    id: 'Manhã - das 9h às 12h'
  },
]

const CheckboxGroup = () => {
  const [checkboxItems, setCheckboxItems] = useState<CheckboxType[]>(checkboxes);

  const handleCheckboxChange = useCallback((checkbox: CheckboxType) => {
    const modifiedItems = checkboxItems.map(item => {
      item.id === checkbox.id ? item.isChecked = !checkbox.isChecked : item = item;

      return item;
    });

    setCheckboxItems([...modifiedItems]);
  }, [checkboxItems]);

  console.log(checkboxItems[0]);
  console.log(checkboxItems[1]);

  return (
    <GroupContainer>
      <h4>Manhã</h4>

      <div>
        {checkboxes && checkboxes.map(checkbox => (
          <Checkbox
            label={checkbox.label}
            isChecked={checkbox.isChecked}
            key={checkbox.label}
            id={checkbox.id}
            onClick={() => handleCheckboxChange(checkbox)}
          />
        ))}
      </div>
    </GroupContainer>
  )
}

export default memo(CheckboxGroup);
