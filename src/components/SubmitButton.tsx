// components/SubmitButton.tsx
import React from 'react';
import { Button } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';

interface SubmitButtonProps {
  onClick: () => void;
  text?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, text = '送信' }) => {
    const { colorMode } = useColorMode();
  return (
    <Button
      onClick={onClick}
      bgGradient= {colorMode === 'light' ? 'linear(to-r, #72BFF8, #3D78DF)' : 'linear(to-r, #FF8888, #FF4C86)'}
      color='white'
      size='lg'
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
