import { fireEvent, render } from '@testing-library/react';
import Dropdown from '@/components/atom/Dropdown';

describe('<Dropdown />', () => {
  it('Should render dropdown component', () => {
    const dropdownOptions = [
      {
        id: 1,
        value: 'R$ 1000,00',
        label: 'R$ 1000,00',
      },
    ];

    const { getByText } = render(
      <Dropdown options={dropdownOptions} defaultValue="Parcelar em" />,
    );

    expect(getByText('Parcelar em')).toBeTruthy();
  });

  it('Should change dropdown value', () => {
    const dropdownOptions = [
      {
        id: 1,
        value: 'R$ 1000,00',
        label: 'R$ 1000,00',
      },
    ];

    const { getByText, getByRole, queryByText } = render(
      <Dropdown options={dropdownOptions} defaultValue="Parcelar em" />,
    );

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByText('R$ 1000,00'));

    expect(getByText('R$ 1000,00')).toBeTruthy();
    expect(queryByText('Parcelar em')).toBeNull();
  });

  it('Should change dropdown value and setValue', () => {
    const dropdownOptions = [
      {
        id: 1,
        value: 'R$ 1000,00',
        label: 'R$ 1000,00',
      },
    ];

    let value = '';
    const setValue = (args: any): void => {
      value = args;
    };

    const { getByText, getByRole, queryByText } = render(
      <Dropdown
        options={dropdownOptions}
        defaultValue="Parcelar em"
        value={value}
        setValue={setValue}
      />,
    );

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByText('R$ 1000,00'));

    expect(value).toBe('R$ 1000,00');
    expect(getByText('R$ 1000,00')).toBeTruthy();
    expect(queryByText('Parcelar em')).toBeNull();
  });
});
