import { CheckboxItem } from '@/styles/components/atom/Checkbox';
import { LabelHTMLAttributes, ReactElement } from 'react';
import { MdCheck } from 'react-icons/md';

export interface CheckboxType {
  isChecked?: boolean;
  label: string;
  id: string;
}

interface CheckboxProps
  extends CheckboxType,
    Omit<LabelHTMLAttributes<HTMLLabelElement>, 'id'> {
  description?: string;
}

const Checkbox = ({
  isChecked = false,
  label,
  id,
  description = '',
  ...rest
}: CheckboxProps): ReactElement => {
  return (
    <CheckboxItem
      isChecked={isChecked}
      id={id}
      className={description && 'checkbox-align-center'}
      {...rest}
    >
      {' '}
      <div className={description && 'checkbox-with-description'}>
        <label>{label}</label>
        <span>{description}</span>
      </div>
      <input type="checkbox" checked={isChecked} />
      <MdCheck />
    </CheckboxItem>
  );
};

export default Checkbox;
