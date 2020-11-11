import { render } from '@testing-library/react';
import WhatsappWidget from '@/components/atom/WhatsappWidget';

jest.mock('mixpanel-browser');

const setup = (): any => {
  const { getByTestId } = render(<WhatsappWidget />);
  return { getByTestId };
};

describe('<WhatsappWidget />', () => {
  it('Should render WhatsappWidget component', () => {
    const { getByTestId } = setup();

    expect(getByTestId('whatsapp-widget-atom')).toBeDefined();
  });
});
