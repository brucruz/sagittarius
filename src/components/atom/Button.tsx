import { Base } from '@/styles/components/atom/Button';
import { ButtonHTMLAttributes, ReactElement } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: ButtonProps): ReactElement => {
  return <Base {...rest}>{children}</Base>;
};

export default Button;
