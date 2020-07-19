import React, { useState } from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import Typist from 'react-typist';
import Cursor from 'react-typist';

const LandingModal = (props) => {
  const {
    buttonLabel,
    modalTitle,
    modalClasses,
    children,
    openLoginForm,
  } = props;

  const [modal, setModal] = useState(openLoginForm);
  const toggle = () => setModal(!modal);

  return (
    <div className='landing-modal'>
      <div className='landing-modal-button' onClick={toggle}>
        <img
          className='landing-parchment'
          src='https://66.media.tumblr.com/438cd9073e6564e56e17cf9282327fdb/tumblr_inline_o6zo5fx7c11qdrkxz_500.png'
          alt='Survivor parchment'
        />
        <Typist
          startDelay={1000}
          className='modal-button-text'
          avgTypingDelay={40}
          avgTypingSpeed={70}
        >
          {buttonLabel}
          <Cursor show={true} element='|' />
        </Typist>
      </div>

      <Modal isOpen={modal} toggle={toggle} className={modalClasses}>
        <ModalHeader className='' toggle={toggle}>
          {modalTitle}
        </ModalHeader>
        <div className='modal-body-section'>{children}</div>
      </Modal>
    </div>
  );
};

export default LandingModal;
