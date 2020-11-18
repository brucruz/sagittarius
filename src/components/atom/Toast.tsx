/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/ban-types */
import { ReactElement, useEffect } from 'react';

import { ToastMessage, useToast } from '@/hooks/toast';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from '@/styles/components/atom/Toast';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast = ({ message, style }: ToastProps): ReactElement => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    // se esse componente for removido de outra forma (clique), cancelar o timer
    // função do React: se eu retornar uma função dentro do useEffect, essa função será automaticamente executada se esse componente deixar de existir
    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      data-testid="toast-atom"
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button
        data-testid="button-close-toast"
        onClick={() => {
          console.log('hehehe')
          removeToast(message.id);
        }}
        type="button"
      >
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
