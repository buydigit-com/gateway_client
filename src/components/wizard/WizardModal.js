import FalconCloseButton from 'components/common/FalconCloseButton';
import Flex from 'components/common/Flex';
import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import animationData from './lottie/warning-light.json';

const WizardModal = ({ modal, setModal, setStep,shopTheme }) => {
  function Message() {
    switch (modal.switchMessage) {
      case 'scanPageBack':
        return (
          <p className="mb-0 flex-1">
            If you want to go back make sure you haven't already sent the funds
            otherwise they will be lost.
          </p>
        );
      default:
        return (
          <p className="mb-0 flex-1">
            You don't have access to <br />
            the link. Please try again.
          </p>
        );
    }
  }

  return (
    <Modal show={modal.open} centered>
      <Modal.Body className="p-4">
        <FalconCloseButton
          size="sm"
          className="position-absolute top-0 end-0 me-2 mt-2"
          onClick={() => {
            setModal({ open: !modal.open, switchMessage: '' });
          }}
        />
        <Flex justifyContent="center" alignItems="center">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: '100px' }}
          />
          <Message />
        </Flex>
      </Modal.Body>
      {modal.switchMessage === 'scanPageBack' && (
        <Modal.Footer>
          <Button
            variant="danger"
            style={shopTheme.theme.button}
            className="ms-auto rounded-4 px-3 mt-1 py-1"
            transform="down-1 shrink-4"
            onClick={() => {
              setModal({ open: !modal.open, switchMessage: '' });
              setStep(1);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

WizardModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired
};

export default WizardModal;
