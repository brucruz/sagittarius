import { fireEvent, render } from '@testing-library/react';
import { MdEmail } from 'react-icons/md';
import Input from '@/components/atom/Input';
import mastercard from '@/assets/components/atoms/Input/mastercard.svg';

import '@testing-library/jest-dom';

jest.mock('mixpanel-browser');
jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'input-test',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('<Input />', () => {
  it('Should render component', () => {
    const { getByLabelText } = render(
      <Input name="input-test" label="input" />,
    );

    expect(getByLabelText('input')).toBeTruthy();
  });

  it('Should set focus on component', () => {
    const { getByRole, getByText, getByTestId } = render(
      <Input name="input-test" label="input" />,
    );

    fireEvent.focus(getByRole('textbox'));

    expect(getByRole('textbox')).toHaveFocus();

    expect(getByTestId('atom-input')).toHaveStyle(`
      font-size: 16px;
      line-height: 22px;
      height: auto;
      margin-bottom: 4.5px;
    `);

    expect(getByText('input')).toHaveStyle(`
      font-size: 12px;
      line-height: 16px;

      margin-top: 5.5px;
      margin-bottom: 0;

      opacity: 0.6;
    `);
  });

  it('Should display error', () => {
    const { getByText, getByTestId } = render(
      <Input name="input-test" label="input" errorProps="Aqui tem um erro" />,
    );

    expect(getByText('Aqui tem um erro')).toBeTruthy();
    expect(getByText('Tente novamente.')).toBeTruthy();
    expect(getByTestId('atom-user-input')).toHaveStyle(
      'border-bottom: 2px solid #ba3737',
    );
  });

  it('Is component filled?', () => {
    let inputText = '';

    const { getByRole, getByTestId } = render(
      <Input
        name="input-test"
        icon={MdEmail}
        label="input"
        value={inputText}
      />,
    );

    fireEvent.change(getByRole('textbox'), () => {
      inputText = 'test';
    });

    expect(getByTestId('atom-icon-input')).toHaveStyle(`
      color: #4d49c4;
    `);
  });

  it('Should display Icon', () => {
    const { getByTestId } = render(
      <Input name="input-test" icon={MdEmail} label="input" />,
    );

    expect(getByTestId('atom-icon-input')).toBeTruthy();
  });

  it('Should render disabled input', () => {
    const { getByRole, getByTestId } = render(
      <Input name="input-test" disabled label="input" />,
    );

    expect(getByRole('textbox')).toBeDisabled();
    expect(getByRole('textbox')).toHaveStyle('background: #f2f2f2');
    expect(getByTestId('atom-user-input')).toHaveStyle('background: #f2f2f2');
  });

  it('Should render password icon', () => {
    const { getByTestId } = render(
      <Input name="input-test" label="input" type="password" />,
    );

    expect(getByTestId('atom-password-icon')).toBeTruthy();
  });

  it('Change from password type to text when clicking on eye icon', () => {
    const { getByTestId } = render(
      <Input name="input-test" label="input" type="password" value="123" />,
    );

    expect(getByTestId('atom-input')).toHaveAttribute('type', 'password');

    fireEvent.click(getByTestId('atom-password-icon'));

    expect(getByTestId('atom-input')).toHaveAttribute('type', 'text');
  });

  it('Should component already filled', () => {
    const { getByTestId, getByText } = render(
      <Input name="input-test" label="input" value="123" />,
    );

    expect(getByTestId('atom-input')).toHaveStyle(`
      font-size: 16px;
      line-height: 22px;
      height: auto;
      margin-bottom: 4.5px;
    `);

    expect(getByText('input')).toHaveStyle(`
      font-size: 12px;
      line-height: 16px;

      margin-top: 5.5px;
      margin-bottom: 0;

      opacity: 0.6;
    `);
  });

  it('Should render iconAfter', () => {
    const { getByTestId } = render(
      <Input name="input-test" label="input" iconAfter={mastercard} />,
    );

    expect(getByTestId('atom-icon-after-input')).toBeTruthy();
  });

  it('Should render input mask', () => {
    const { getByTestId } = render(
      <Input name="input-test" label="input" mask="9999 9999" value="1" />,
    );

    expect(getByTestId('atom-input')).toHaveAttribute('value', '1___ ____');
  });

  it('Should render isSubmit input', () => {
    const { getByTestId } = render(
      <Input name="input-test" label="input" isSubmit />,
    );

    expect(getByTestId('atom-input')).toBeTruthy();
  });
});
