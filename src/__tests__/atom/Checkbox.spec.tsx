import { render } from '@testing-library/react';
import Checkbox from '@/components/atom/Checkbox';
import { LabelHTMLAttributes } from 'react';
import { shallow } from 'enzyme';

import '@testing-library/jest-dom';

interface CheckboxTestType {
  label: string;
  id: string;
  isChecked?: boolean;
}

interface CheckboxTestProps
  extends CheckboxTestType,
    Omit<LabelHTMLAttributes<HTMLLabelElement>, 'id'> {
  description?: string;
}

const setup = ({ label, id, description }: CheckboxTestProps): any => {
  const { getByTestId } = render(
    <Checkbox description={description} label={label} id={id} />,
  );
  return { getByTestId };
};

describe('<Checkbox />', () => {
  it('Should render component', () => {
    const { getByTestId } = setup({
      label: 'Checkbox label',
      id: 'check-box-id',
    });

    expect(getByTestId('check-box-atom')).toBeDefined();
  });

  it('If has description, should have class checkbox-align-center', () => {
    const { getByTestId } = setup({
      label: 'Checkbox label',
      id: 'check-box-id',
      description: 'Here comes a description',
    });

    expect(getByTestId('check-box-atom')).toHaveClass('checkbox-align-center');
  });

  it('Should change checked state when clicking', () => {
    let isChecked = false;

    const onChange = jest.fn(() => {
      isChecked = !isChecked;
    });

    const wrapper = shallow(
      <Checkbox
        label="Label here"
        id="id-checkbox"
        onChange={onChange}
        isChecked={isChecked}
      />,
    );

    expect(wrapper.find('input').props().checked).toBe(false);

    wrapper.simulate('change');
    wrapper.setProps({ isChecked });

    expect(wrapper.find('input').props().checked).toBe(true);
  });
});
