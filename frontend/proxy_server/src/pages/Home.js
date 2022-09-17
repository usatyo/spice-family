import React, { useState } from 'react';
import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center, Image } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import MyChart from '../components/myChart'
import TimerSvg from '../assets/timer.svg'


const Home = () => {
    return (
        <div className="App" >
            <header className="App-header">
                <VStack ml={100} mt={50} spacing={10}>
                    <HStack mb={30}>


                        <Box pl={270} pr={230} color={'#59A4CB'} fontSize="7xl" fontWeight="bold" >プロ棋士サーバ</Box>
                        <Spacer></Spacer>
                    </HStack>

                    <Stack p={12} bg={"white"} shadow="lg" rounded="20px" w="900px" h="450px">
                        <MyChart />
                    </Stack>
                    <Link to="/prepare" >
                        <Button colorScheme="blue" variant="solid" w="100%" h="80px" borderRadius="40px" >
                            <Text fontSize="2xl" fontWeight="bold" colorScheme="blue"><Image src={TimerSvg} h={10} />対局開始</Text>
                        </Button>
                    </Link>
                </VStack>
            </header>
        </div>
    )
}

export default Home