import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
  Paragraph,
} from '@twilio-paste/core';
import React from 'react';

export const OtpModal = ({ isOpen, onClose, onConfirm }) => {
  const modalHeadingID = 'otp';
  const [otpValue, setOtpValue] = React.useState('');
  const [validating, setValidating] = React.useState(false);

  const handleOtpChange = (e) => {
    setOtpValue(e.target.value);
  };

  const handleConfirm = () => {
    onConfirm(otpValue);
  };

  return (
    <Modal
      ariaLabelledby={modalHeadingID}
      isOpen={isOpen}
      onDismiss={onClose}
      size="default"
    >
      <ModalHeader>
        <ModalHeading as="h3" id={modalHeadingID}>
          Confirm your phone number
        </ModalHeading>
      </ModalHeader>
      <ModalBody>
        <Paragraph>
          We successfully sent a code to your phone. Enter the code to confirm
          subscription.
        </Paragraph>

        <Label htmlFor="code" required>
          Code
        </Label>
        <Input id="code" name="code" type="text" onChange={handleOtpChange} />
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            loading={validating}
          >
            Done
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};
