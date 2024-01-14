// pages/teachers/[SubName].tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Flex,
    Box,
    Card,
} from '@chakra-ui/react';
import Axios from 'axios';
import { SideBar } from '../components/SideBar';
import CustomHeading from '@/components/CustomHeading';

interface Category {
    ID: number;
    Number: number;
    Name: string;
    Status: boolean;
}

const Teacher: React.FC = () => {
    const router = useRouter();
    const { SubName, SubName2 } = router.query as { SubName: string, SubName2: string };

    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStudentData, setNewStudentData] = useState({ Number: 20, Name: '' });

    const setStatus = async (subject: string | undefined, categoryId: number) => {
        try {
            const updatedCategoryList = categoryList.map((category) =>
                category.ID === categoryId ? { ...category, Status: !category.Status } : category
            );
            await Axios.put(`/api/update/Teacher/${subject}/${categoryId}`, {
                newStatus: updatedCategoryList.find((category) => category.ID === categoryId)?.Status ? 1 : 0,
            });
            // Update the client's state if the update is successful
            setCategoryList(updatedCategoryList);
        } catch (error) {
            console.error(error);
        }
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStudentData({
            ...newStudentData,
            [e.target.name]: e.target.value,
        });
    };

    const addStudent = async () => {
        try {
            await Axios.post(`/api/put/Teacher/${SubName}`, newStudentData);
            closeModal();
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = useCallback(() => {
        Axios.get<Category[]>(`/api/get/Teacher/${SubName}`).then(
            (response) => {
                setCategoryList(response.data);
            }
        );
    }, [SubName]);

    useEffect(() => {
        if (SubName) {
            fetchData();
        }
    }, [SubName, fetchData]);

    const data2 = categoryList.map((val, index) => {
        return (
            <Tbody key={index}>
                <Tr>
                    <Td>{val.ID}</Td>
                    <Td>{val.Number}</Td>
                    <Td>{val.Name}</Td>
                    <Td color={val.Status ? 'teal' : 'tomato'}>{val.Status ? '出席' : '欠席'}</Td>
                    <Td>
                        <Button variant='outline' onClick={() => SubName && setStatus(SubName, val.ID)}>
                            Status
                        </Button>
                    </Td>
                </Tr>
            </Tbody>
        );
    });

    return (
        <Flex>
            <SideBar />

            <Box ml="250px" p={10} flex="1">
                <Box margin={10}>
                    <CustomHeading text={SubName2} />
                    <Card p={10}>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>ID</Th>
                                        <Th>Number</Th>
                                        <Th>Name</Th>
                                        <Th>Status</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                {data2}
                            </Table>
                        </TableContainer>
                    </Card>
                    <Button variant='outline' marginTop={10} onClick={openModal}>
                        学生追加
                    </Button>

                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>学生追加</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl>
                                    <FormLabel>学籍番号</FormLabel>
                                    <Input
                                        type='number'
                                        name='Number'
                                        value={newStudentData.Number}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>名前</FormLabel>
                                    <Input
                                        type='text'
                                        name='Name'
                                        value={newStudentData.Name}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={addStudent}>
                                    保存
                                </Button>
                                <Button onClick={closeModal}>閉じる</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Box>
        </Flex>
    );
};

export default Teacher;
