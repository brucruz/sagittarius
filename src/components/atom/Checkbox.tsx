import { CheckboxItem } from "@/styles/components/atom/Checkbox";
import { LabelHTMLAttributes } from "react";
import { MdCheck } from "react-icons/md";

export interface CheckboxType {
  isChecked?: boolean;
  label: string;
  type?: 'checkbox' | 'radio';
  id: string;
}

interface CheckboxProps extends CheckboxType, Omit<LabelHTMLAttributes<HTMLLabelElement>, 'id'> {

}

const Checkbox = ({ isChecked = false, label, type = 'checkbox', id, ...rest }: CheckboxProps) => {
  return (
    <CheckboxItem
      isChecked={isChecked}
      id={id}
      {...rest}
    >{label}
      <input type={type} checked={isChecked}/>
      <MdCheck/>
    </CheckboxItem>
  )
}

export default Checkbox;
