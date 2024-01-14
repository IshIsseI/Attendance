import React, { useState, useEffect } from 'react';
import { HStack, Button, Box, Heading, Flex, OrderedList, ListItem, Input } from '@chakra-ui/react';
import Axios from 'axios';
import SideBar from '@/components/SideBar';
import CustomHeading from '@/components/CustomHeading';

function Setting() {
    interface Category {
        ID: number;
        Text: string;
    }
    interface Category2 {
        Number: number;
        Name: string;
        Grade: number;
        Class: string;
    }

    const [newItem, setNewItem] = useState('');
    const [itemList, setItemList] = useState<Category[]>([]);
    const [studentData, setStudentData] = useState<Category2[]>([]);

    useEffect(() => {
        fetchItemListFromServer();
    }, []);

    const ResetAll = () => {
        DisabledChange;
        StudentChange;
    }

    const DisabledChange = () => {
        Axios.put(`/api/update/Setting/Disabled`);
    }

    const StudentChange = async () => {
        const responce = await Axios.get<Category2[]>(`/api/get/Setting/Student`);
        setStudentData(responce.data);
        studentData.map((val, index) => {
            Axios.put(`/api/update/Setting/Student`, { Number: val.Number });
        })
    }

    const fetchItemListFromServer = async () => {
        try {
            const response = await Axios.get('/api/get/Setting/Todo');
            setItemList(response.data);
        } catch (error) {
            console.error('Error fetching item list:', error);
        }
    };

    const addItem = async () => {
        try {
            await Axios.post(`/api/update/Setting/Todo/${newItem}`);
            // 追加後にサーバーから最新のデータを取得する
            fetchItemListFromServer();
            setNewItem('');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const removeItem = async (textToRemove: string) => {
        try {
            await Axios.delete(`/api/update/Setting/Todo/Delete/${encodeURIComponent(textToRemove)}`);
            // 削除後にサーバーから最新のデータを取得する
            fetchItemListFromServer();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <Flex>
            <Flex>
                {/*Side Bar*/}
                <SideBar />

                <Box ml="250px" p={10} flex="1">
                    <Box margin={10}>
                        <CustomHeading text='Setting' />
                        <Heading marginBottom={5} marginTop={10}>Reset All</Heading>
                        <Button onClick={ResetAll}>Reset</Button>
                        <Heading marginBottom={5} marginTop={10}>Reset DisabledData</Heading>
                        <Button onClick={DisabledChange}>Reset</Button>
                        <Heading marginBottom={5} marginTop={10}>Reset StudentData</Heading>
                        <Button onClick={StudentChange}>Reset</Button>

                        <Heading marginBottom={5} marginTop={20}>To Do</Heading>

                        <OrderedList paddingLeft={5}>
                            {itemList.map((item, index) => (
                                <HStack key={index} margin={3}>
                                    <ListItem>{item.Text}</ListItem>
                                    <Button onClick={() => removeItem(item.Text)}>削除</Button>
                                </HStack>
                            ))}
                        </OrderedList>

                        <Box marginTop={10}>
                            <Input
                                placeholder="新しい項目を追加"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                            />
                            <Button onClick={addItem} marginTop={2}>追加</Button>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
}

export default Setting;
