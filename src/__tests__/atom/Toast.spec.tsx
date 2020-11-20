import { render, fireEvent, waitFor } from '@testing-library/react';
import Toast from '@/components/atom/Toast';

interface ToastTestMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastTestProps {
  message: ToastTestMessage;
  // eslint-disable-next-line @typescript-eslint/ban-types
  style: object;
}

jest.mock('@/hooks/toast', () => ({
  useToast: () => ({
    removeToast: jest.fn(),
  }),
}));

const setup = ({ message, style }: ToastTestProps): any => {
  const { getByTestId } = render(<Toast style={style} message={message} />);

  return { getByTestId };
};

describe('<Toast />', () => {
  it('Should render Toast component', () => {
    const message = {
      id: '1',
      title: 'title',
      description: 'description',
    };

    const { getByTestId } = setup({
      message,
      style: {
        from: { right: '-120%', opacity: 0 },
        enter: { right: '0%', opacity: 1 },
        leave: { right: '-120%', opacity: 0 },
      },
    });

    expect(getByTestId('toast-atom')).toBeTruthy();
  });

  it('Should remove toast component when clicking on close button', () => {
    const message = {
      id: '1',
      title: 'title',
      description: 'description',
    };

    const { getByTestId } = setup({
      message,
      style: {
        from: { right: '-120%', opacity: 0 },
        enter: { right: '0%', opacity: 1 },
        leave: { right: '-120%', opacity: 0 },
      },
    });

    fireEvent.click(getByTestId('button-close-toast'));

    waitFor(() => expect(getByTestId('toast-atom')).not.toBeTruthy());
  });

  it('Should remove toast component after 3 seconds', () => {
    const message = {
      id: '1',
      title: 'title',
      description: 'description',
    };

    const { getByTestId } = setup({
      message,
      style: {
        from: { right: '-120%', opacity: 0 },
        enter: { right: '0%', opacity: 1 },
        leave: { right: '-120%', opacity: 0 },
      },
    });

    waitFor(() => expect(getByTestId('toast-atom')).not.toBeTruthy(), {
      timeout: 3000,
    });
  });
});
