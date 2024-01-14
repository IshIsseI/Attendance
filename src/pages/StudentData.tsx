import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Flex,
  Box,
  Card,
  Button,
  HStack,
  Input,
} from '@chakra-ui/react';
import Axios from 'axios';
import { SideBar } from '../components/SideBar';
import CustomHeading from '../components/CustomHeading';
import { useNumberInput } from "@chakra-ui/react";

interface Category {
  Number: number;
  Name: string;
  Grade: number;
  Class: string;
}

interface Category2 {
  Subject: string;
  Subject2: string;
  AttendanceNum: number;
  NowNum: number;
  ID: number;
}

const StudentData: React.FC = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [categoryList2, setCategoryList2] = useState<Category2[]>([]);
  const [PushNumber, setPushNumber] = useState<number>();

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

  const ViewData = async (Number: number) => {
    try {
      setPushNumber(Number);
      const response2 = await Axios.get<Category2[]>(`/api/get/StudentData/${Number}`);
      setCategoryList2(response2.data);
      console.log(categoryList2);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const data2 = categoryList.map((val, index) => {
    return (
      <Tbody key={index}>
        <Tr>
          <Td>{val.Number}</Td>
          <Td>{val.Name}</Td>
          <Td>{val.Grade}</Td>
          <Td>{val.Class}</Td>
          <Td><Button onClick={() => ViewData(val.Number)}>View</Button></Td>
        </Tr>
      </Tbody>
    );
  });

  const data3 = categoryList2.map((val2, index2) => {
    return (
      <Tr key={index2}>
        <Td>{val2.Subject2}</Td>
        <Td>{val2.AttendanceNum}</Td>
        <Td>{val2.NowNum}</Td>
        <Td>16</Td>
      </Tr>
    );
  });

  return (
    <Flex>
      <SideBar />

      <Box ml="250px" p={10} flex="1">

        <Box margin={10}>
          <CustomHeading text='Students' />
          <Card p={10}>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Number</Th>
                    <Th>Name</Th>
                    <Th>Grade</Th>
                    <Th>Class</Th>
                    <Th>Data</Th>
                  </Tr>
                </Thead>
                {data2}
              </Table>
            </TableContainer>
          </Card>
          <Card p={10} marginTop={10}>
            <Heading marginBottom={5}>学籍番号: {PushNumber}</Heading>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>講義</Th>
                    <Th>出席回数</Th>
                    <Th>現回数</Th>
                    <Th>総回数</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data3}
                </Tbody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>
    </Flex>
  );
};

export default StudentData;
