import { Base } from '@/styles/components/atom/Button';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: ButtonProps): ReactNode => {
  return <Base {...rest}>{children}</Base>;
};

export default Button;
