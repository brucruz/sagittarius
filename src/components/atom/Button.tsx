import { Base } from '@/styles/components/atom/Button';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <Base { ...rest }>
      { children }
    </Base>
  );
}

export default Button;
