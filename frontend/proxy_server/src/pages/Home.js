import React, { useState } from 'react';
import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center, Image } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import MyChart from '../components/MyChart'
import TimerSvg from '../assets/timer.svg'


const Home = () => {
    return (
        <div className="App" >
            <header className="App-header">
                <VStack ml={100} mt={50}>
                    <HStack mb={30}>
                        <Link to='/prepare'>
                            <Button p={4} bg={"white"} shadow="lg" rounded="20px" w="120px" h="120px">
                                <Image src={TimerSvg} h={75} />
                            </Button>
                        </Link>
                        <Box pl={270} pr={230} color={'#59A4CB'} fontSize="7xl" fontWeight="bold" >プロ棋士サーバ</Box>
                        <Spacer></Spacer>
                        <Box pt={3} pl={4} bg={"white"} color={"black"} fontSize={17} textAlign={"left"} shadow="lg" rounded="10px" w="180px" h="50px">北海道大学囲碁部</Box>
                    </HStack>
                    <Stack p={12} bg={"white"} shadow="lg" rounded="20px" w="900px" h="450px">
                        <MyChart />
                    </Stack>
                </VStack>
            </header>
        </div >
    )
}

export default Home