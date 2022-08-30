import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center } from "@chakra-ui/react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './../App.css';
import banImg from './../images/ban.png';
import Modal from "react-modal";

const Result = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Text fontSize="75px" fontWeight="bold" color="black">Result</Text>
                <Box h="full" w="full">
                    <HStack p={10}>
                        {/* 左のプレイヤー(playState=0) */}
                        <Flex w="full" align="center">
                            <Spacer></Spacer>
                            <VStack>
                                <Text p="10px" fontSize="50px" fontWeight="bold" color="black">WINNER</Text>
                                <Box p={4} transition="0.5s" bg="white" border="2px" borderColor="white" shadow="xl" rounded="41px" w="500px" h="300px" margin={"0%"}>

                                    <HStack h="full" >
                                        <Spacer />
                                        <Text fontSize="50px" fontWeight="bold" color="red">上三角</Text>
                                        <Text fontSize="50px" fontWeight="bold" color="black">1600</Text>
                                        <Spacer />
                                    </HStack>
                                </Box>
                            </VStack>

                            <Spacer></Spacer>
                        </Flex>
                        {/* 右のプレイヤー */}
                        <Flex w="full" align="center">
                            <Spacer></Spacer>
                            <VStack>
                                <Text p="10px" fontSize="50px" fontWeight="bold" color="black">LOSER</Text>
                                <Box p={4} transition="0.5s" bg="white" border="2px" borderColor="white" shadow="xl" rounded="41px" w="500px" h="300px" margin={"0%"}>
                                    <HStack h="full">
                                        <Spacer />
                                        <Text fontSize="50px" fontWeight="bold" color="blue">下三角</Text>
                                        <Text fontSize="50px" fontWeight="bold" color="black">1400</Text>
                                        <Spacer />
                                    </HStack>
                                </Box>
                            </VStack>
                            <Spacer></Spacer>
                        </Flex>

                    </HStack >
                    <Button m="20px" colorScheme=" blue" variant="solid" w="400px" h="70px" borderRadius={25} onClick={() => { }}>
                        <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">終了</Text>
                    </Button>
                </Box>
            </header>
        </div >
    )
}

export default Result