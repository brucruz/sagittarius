import { Base } from '@/styles/components/atom/RadioButton';

interface RadioButtonProps {
  label?: string,
  name: string,
  isChecked?: boolean,
  value?: string,
}

const RadioButton = ({ label, value, isChecked, name }: RadioButtonProps) => {
  return (
    <Base
    >
      <span className="text">{label}</span>
      <input type="radio"checked={isChecked} value={value} name={name}/>
      <span className="checkmark">
        <span></span>
      </span>
    </Base>
  )
}

export default RadioButton;
