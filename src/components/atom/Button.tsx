import { Base } from '@/styles/components/atom/Button';
import { ButtonHTMLAttributes, ReactElement } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: ButtonProps): ReactElement => {
  return (
    <Base data-testid="button-atom" {...rest}>
      {children}
    </Base>
  );
};

export default Button;
