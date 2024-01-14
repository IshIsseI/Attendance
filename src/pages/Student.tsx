import { useState } from 'react';
import { BarCode } from './BarCode';
import { Box, Card, Input, CardBody, CardFooter, Heading, useToast, Center } from '@chakra-ui/react';
import Axios from 'axios';
import { useRouter } from 'next/router';
import CustomHeading from '@/components/CustomHeading';

const Student: React.FC = () => {
    const [codes, setCodes] = useState<string[]>([]);
    const router = useRouter();
    const { SubName } = router.query as { SubName: string };
    const toast = useToast();

    const handleReadCode = (result: any) => {
        const scannedNumber = result.getText();
        setCodes((prevCodes) => Array.from(new Set([...prevCodes, scannedNumber])));

        //学生を出席にする
        Axios.put(`/api/update/Student/attendanceOn`, {
            Number: scannedNumber,
            subject: SubName,
        })
            .then((response) => {
                console.log(response.data);
                toast({
                    title: '出席',
                    description: `学籍番号 ${scannedNumber} の学生を出席にしました．`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                console.error(error);
                toast({
                    title: 'Error',
                    description: '学生の出席情報を更新できませんでした．',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box marginTop={5} marginLeft={20} marginRight={20} >
            <CustomHeading text='Barcode Reader' />
            <Center>
                <Box >
                    <Card maxW='100%'>
                        <CardBody>
                            <BarCode onReadCode={handleReadCode} />
                        </CardBody>
                        <CardFooter>
                            <Input flex='1' placeholder='学籍番号' value={codes.join('\n')} />
                        </CardFooter>
                    </Card>
                </Box>
            </Center>
        </Box>
    );
};

export default Student;
