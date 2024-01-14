import React, { useState, useEffect } from 'react';
import { HStack, Button, Box, Heading, Flex, Card, OrderedList, ListItem, Input, Tr, Td, TableContainer, Table, Thead, Tbody, Th, useToast } from '@chakra-ui/react';
import Axios from 'axios';
import SideBar from '@/components/SideBar';
import CustomHeading from '@/components/CustomHeading';
import SubmitButton from '@/components/SubmitButton';

function Setting() {
    interface Category {
        Number: number;
        Name: string;
        Grade: number;
        Class: string;
        Mail: string;
    }

    interface Category2 {
        Subject: string;
        Subject2: string;
        AttendanceNum: number;
        NowNum: number;
        ID: number;
    }

    interface Category3 {
        Mail: string;
        Subject: string;
    }

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categoryList3, setCategoryList3] = useState<Category3[]>([]);
    const [data, setData] = useState<JSX.Element[]>([]);
    const [data2, setData2] = useState<JSX.Element[]>([]);
    const toast = useToast();

    const sendMail = async () => {
        for (const val of categoryList3) {
            try {
                await Axios.post('/api/Python/SendMail', {
                    to: val.Mail,
                    subject: '欠課時数のお知らせ(自動送信)',
                    body: `あと1回休むと、${val.Subject}の欠課時数が3/10を超えてしまいます。`,
                  });
                toast({
                    title: 'メール送信成功',
                    description: 'メールが正常に送信されました。',
                    status: 'success',
                    duration: 5000, // Optional duration for the notification
                    isClosable: true,
                });
                console.log('Mail sent successfully');
            } catch (error) {
                toast({
                    title: 'エラー',
                    description: 'メールの送信中にエラーが発生しました。',
                    status: 'error',
                    duration: 5000, // Optional duration for the notification
                    isClosable: true,
                });
                console.error('Error sending mail:', error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get<Category[]>('/api/get/Students');
                setCategoryList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchData2 = async () => {
            const newData: JSX.Element[] = [];
            const newData2: JSX.Element[] = [];
            const newCategoryList3: Category3[] = [];

            for (const val of categoryList) {
                const response2 = await Axios.get<Category2[]>(`/api/get/StudentData/${val.Number}`);

                if (isMounted) {
                    const innerData = response2.data
                        .filter(val2 => val2.NowNum - val2.AttendanceNum === 4)
                        .map((val2, index2) => {
                            newCategoryList3.push({ Mail: val.Mail, Subject: val2.Subject2 });

                            return (
                                <Tr key={index2}>
                                    <Td>{val.Name}</Td>
                                    <Td>{val.Number}</Td>
                                    <Td>{val2.Subject2}</Td>
                                    <Td>{val2.AttendanceNum}</Td>
                                    <Td>{val2.NowNum}</Td>
                                    <Td>16</Td>
                                </Tr>
                            );
                        });

                    newData.push(...innerData);

                    const innerData2 = response2.data
                        .filter(val2 => val2.NowNum - val2.AttendanceNum > 4)
                        .map((val2, index2) => (
                            <Tr key={index2}>
                                <Td>{val.Name}</Td>
                                <Td>{val.Number}</Td>
                                <Td>{val2.Subject2}</Td>
                                <Td>{val2.AttendanceNum}</Td>
                                <Td>{val2.NowNum}</Td>
                                <Td>16</Td>
                            </Tr>
                        ));

                    newData2.push(...innerData2);

                    setData(newData);
                    setData2(newData2);
                }
            }

            if (isMounted) {
                setData(newData);
                setData2(newData2);
                setCategoryList3(newCategoryList3);
            }
        };

        fetchData2();

        return () => {
            isMounted = false;
        };
    }, [categoryList]);

    return (
        <Flex>
            <Flex>
                {/*Side Bar*/}
                <SideBar />

                <Box ml="250px" p={10} flex="1">
                    <Box margin={10}>
                        <CustomHeading text='Mail' />

                        <Card p={10} marginTop={10} marginBottom={10}>
                            <Heading marginBottom={5}>出席日数注意学生</Heading>
                            <TableContainer>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>学生</Th>
                                            <Th>学籍番号</Th>
                                            <Th>講義</Th>
                                            <Th>出席回数</Th>
                                            <Th>現回数</Th>
                                            <Th>総回数</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Card>
                        <Card p={10} marginTop={10} marginBottom={10}>
                            <Heading marginBottom={5}>出席不足</Heading>
                            <TableContainer>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>学生</Th>
                                            <Th>学籍番号</Th>
                                            <Th>講義</Th>
                                            <Th>出席回数</Th>
                                            <Th>現回数</Th>
                                            <Th>総回数</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data2}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Card>
                        <SubmitButton onClick={sendMail} text='メールを送信' />
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
}

export default Setting;
