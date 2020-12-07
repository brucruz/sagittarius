import { InputHTMLAttributes, ReactElement } from 'react';
import { Base, TextContainer } from '@/styles/components/atom/RadioButton';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  isChecked?: boolean;
  value?: string;
  description?: string;
}

const RadioButton = ({
  label,
  value,
  isChecked,
  name,
  description,
  ...rest
}: RadioButtonProps): ReactElement => {
  return (
    <Base data-testid="radio-button-atom">
      <TextContainer>
        <span className="text">{label}</span>
        {description && <span>{description}</span>}
      </TextContainer>
      <input
        {...rest}
        type="radio"
        checked={isChecked}
        value={value}
        name={name}
      />
      <span className="checkmark">
        <span />
      </span>
    </Base>
  );
};

export default RadioButton;
