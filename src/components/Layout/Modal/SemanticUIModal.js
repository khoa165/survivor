import React from 'react';
import { Modal } from 'semantic-ui-react';
import './Modal.scss';

const SemanticUIModal = (props) => {
  const { trigger, modalTitle, modalClasses, children } = props;

  return (
    <Modal trigger={trigger} className={modalClasses}>
      <Modal.Header>{modalTitle}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default SemanticUIModal;
