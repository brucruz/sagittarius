import RadioButton from '@/components/atom/RadioButton';
import { render } from '@testing-library/react';

interface RadioButtonTestProps {
  label?: string;
  name: string;
  isChecked?: boolean;
  value?: string;
}

const setup = ({ label, name, isChecked }: RadioButtonTestProps): any => {
  const { getByTestId } = render(
    <RadioButton label={label} name={name} isChecked={isChecked} />,
  );
  return { getByTestId };
};

describe('<RadioButton />', () => {
  it('Should render Radio Button component', () => {
    const { getByTestId } = setup({
      label: 'Radio Button Label',
      name: 'radio-button-test',
      isChecked: false,
    });

    expect(getByTestId('radio-button-atom')).toBeDefined();
  });
});
