import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Button, SimpleGrid, Box, HStack, Flex, Center } from '@chakra-ui/react'
import Axios from 'axios';
import Link from "next/link";
import { useRouter } from 'next/router';
import { SideBar } from '@/components/SideBar';
import CustomHeading from '@/components/CustomHeading';
import SubmitButton from '@/components/SubmitButton';

//Database: Monday ~ Friday
interface Category {
    SubjectName: string;
    SubjectName2: string;
    ID: number;
    Format: string;
    Unit: number;
    Start: number;
    Time: number;
}

interface Category2 {
    ID: number;
    Number: number;
    Name: string;
    Status: boolean;
}

const SelectSubject: React.FC = () => {

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categoryList2, setCategoryList2] = useState<Category2[]>([]);
    const router = useRouter();
    const { selectedWeek, selectedDay } = router.query as { selectedWeek: string, selectedDay: string };

    const dayJPN = (selectedDay: string) => {
        if (selectedDay === 'Monday') {
            return '月';
        } else if (selectedDay === 'Tuesday') {
            return '火';
        } else if (selectedDay === 'Wednesday') {
            return '水';
        } else if (selectedDay === 'Thursday') {
            return '木';
        } else if (selectedDay === 'Friday') {
            return '金';
        }
    }

    //最初に
    useEffect(() => {
        Axios.get<Category[]>(`/api/get/SelectSubject/${selectedDay}`)
            .then((response) => {
                setCategoryList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching subjects:', error);
            });
    }, [selectedDay]);

    // 送信ボタンを押した時
    const setdisabledStatus = async () => {
        try {
            const promises = categoryList.map(async (val) => {
                const SubName1 = val.SubjectName2;
                const responseCategory2 = await Axios.get<Category2[]>(`/api/get/SelectSubject2/${SubName1}`);
                const categoryList2 = responseCategory2.data;

                // Update the subjects using Promise.all
                await Promise.all(categoryList2.map(async (val2) => {
                    const SubName2 = val.SubjectName2;
                    const SubNumber = val2.Number;
                    const SubStatus = val2.Status;
                    console.log(SubNumber);
                    await Axios.put(`/api/update/SelectSubject/${SubNumber}/${SubName2}/${SubStatus}`);
                }));

                const subject = val.SubjectName2;
                await Axios.put(`/api/update/SelectSubject3/${subject}`);
            });

            // Wait for all promises to complete
            await Promise.all(promises);

            // Update the final part
            await Axios.put(`/api/update/SelectSubject2/${selectedWeek}/${selectedDay}`);
            console.log('Data updated successfully');

            router.push({
                pathname: '/SelectTime',
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };



    const data = categoryList.map((val: Category, index: number) => {

        const Next1 = () => {
            const SubName = val.SubjectName2;
            const SubName2 = val.SubjectName;
            if (SubName != null) {
                router.push({
                    pathname: '/Teacher',
                    query: { SubName, SubName2 },
                });
            }
        }
        const Next2 = () => {
            const SubName = val.SubjectName2;
            if (SubName != null) {
                router.push({
                    pathname: '/Student',
                    query: { SubName },
                });
            }
        }

        return (
            <Card marginTop={10} key={index} >
                <CardHeader margin={5} marginBottom={-3}>
                    <Heading fontSize='25px'>{val.SubjectName}</Heading>
                    <Heading fontSize='15px' color='gray'>{val.SubjectName2}</Heading>
                </CardHeader>

                <CardBody marginLeft={5}>
                    <HStack marginBottom={1}>
                        <p>開始: </p>
                        <p>{val.Start}限</p>
                    </HStack>
                    <HStack marginBottom={1}>
                        <p>時間: </p>
                        <p>{val.Time}時間</p>
                    </HStack>
                    <HStack marginBottom={1}>
                        <p>形式: </p>
                        <p>{val.Format}</p>
                    </HStack>
                    <HStack>
                        <p>単位: </p>
                        <p>{val.Unit}単位</p>
                    </HStack>
                </CardBody>

                <CardFooter marginLeft={5} marginRight={5} marginBottom={5}>
                    <HStack>
                        <Button onClick={Next1} variant='outline'>Teacher</Button>
                        <Button onClick={Next2} variant='outline'>Student</Button>
                    </HStack>
                </CardFooter>
            </Card>
        );
    });

    return (
        <Flex>
            <SideBar />

            <Box ml="250px" p={10} flex="1">
                <Box margin={10}>
                    <HStack justifyContent="space-between" alignItems="center" mb={5}>
                        <CustomHeading text='Select Subject' />
                            <SubmitButton onClick={setdisabledStatus} text='Send' />

                    </HStack>

                    <Card maxW='250px' align='center'>
                        <CardBody>
                            <Heading margin={2} fontSize='25px'>第{selectedWeek}週  {dayJPN(selectedDay)}曜日</Heading>
                        </CardBody>
                    </Card>

                    <SimpleGrid templateColumns='repeat(auto-fill, minmax(300px, 1fr))' gap={10}>
                        {data}
                    </SimpleGrid>
                </Box>
            </Box>
        </Flex>
    );
};

export default SelectSubject;
