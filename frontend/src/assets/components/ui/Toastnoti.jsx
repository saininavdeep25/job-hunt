// ToastNotification.js
import React from 'react';
import * as Toast from '@radix-ui/react-toast';

const ToastNotification = ({ open, onOpenChange, message }) => {
  return (
    <Toast.Root open={open} onOpenChange={onOpenChange} className="toast">
      <Toast.Title className="toast-title">Notification</Toast.Title>
      <Toast.Description className="toast-description">{message}</Toast.Description>
      <Toast.Action className="toast-action" onClick={() => onOpenChange(false)}>
        Close
      </Toast.Action>
    </Toast.Root>
  );
};

export default ToastNotification;
