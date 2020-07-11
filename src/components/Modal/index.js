import React, { useState } from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonColor,
    buttonLabel,
    modalTitle,
    modalClasses,
    children,
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className={'text-' + buttonColor} onClick={toggle}>
        <img src='https://66.media.tumblr.com/438cd9073e6564e56e17cf9282327fdb/tumblr_inline_o6zo5fx7c11qdrkxz_500.png' />
      </div>

      <Modal isOpen={modal} toggle={toggle} className={modalClasses}>
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        {children}
      </Modal>
    </div>
  );
};

export default ModalExample;
