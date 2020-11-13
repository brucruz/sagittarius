/* eslint-disable @typescript-eslint/no-empty-function */
import { InputHTMLAttributes } from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import Input, { SuggestionProps } from '@/components/atom/Input';

import '@testing-library/jest-dom';

jest.mock('mixpanel-browser');
jest.mock('@unform/core', () => ({
  useField: () => jest.fn(),
}));

interface InputTestProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errorProps?: string;
  label: string;
  icon?: any;
  type?: string;
  suggestions?: SuggestionProps;
  getInputValue?(value: string): void;
  isSubmit?: boolean;
}

const setup = ({ name, label, ...rest }: InputTestProps): ShallowWrapper => {
  return shallow(<Input name={name} label={label} {...rest} />);
};

describe('<Input />', () => {
  it('Should render input component', () => {
    const wrapper = setup({ name: 'input-name', label: 'input-label' });

    expect(wrapper).toBeDefined();
  });

  it('Should render a submit component', () => {
    const wrapper = setup({
      name: 'input-name',
      label: 'input-label',
      isSubmit: true,
    });

    expect(wrapper).toBeDefined();
  });

  it('Should change input type', () => {
    let type = 'password';

    const onIconClick = jest.fn(() => {
      type = 'text';
    });

    const wrapper = mount(
      <Input name="name" label="label" type={type} value="12345" />,
    );

    wrapper.find('svg').simulate('click', onIconClick);

    expect(wrapper.find('input').props().type).toBe('text');
  });

  it('Should set focus on component', () => {
    const wrapper = mount(<Input name="name" label="label" />);
    wrapper.find('input').simulate('focus');
  });

  it('Should change input value', () => {
    const wrapper = mount(<Input name="input-test" label="label" />);
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { name: 'input-test', value: '12345' } });
  });
});
