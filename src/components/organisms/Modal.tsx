import { HTMLAttributes, ReactElement } from 'react';
import ReactModal from 'react-modal';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal = ({ children, isOpen, setIsOpen }: ModalProps): ReactElement => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={setIsOpen}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          padding: '0px',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#FFF',
          display: 'flex',
          flexDirection: 'column',
          color: '#000000',
          borderRadius: '6px',
          maxWidth: '600px',
          width: '90%',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
