import { Heading } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';

interface CustomHeadingProps {
    text: string;
}

const CustomHeading: React.FC<CustomHeadingProps> = ({ text }) => {
    const { colorMode } = useColorMode();
    return (
        <Heading bgGradient = {colorMode === 'light' ? 'linear(to-tl, #6BA7FA, #274C86)': 'linear(to-tl, #FFAAAA, #FF4C86)'} bgClip='text' fontSize={50} mb={10}>
            {text}
        </Heading>
    );
};

export default CustomHeading;