import React from 'react';
import { Button } from 'semantic-ui-react';

interface SaveButtonProps {
  onClick: () => void;
  label?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, label = 'Save' }) => {
  return (
    <Button primary onClick={onClick}>
      {label}
    </Button>
  );
};

export default SaveButton;