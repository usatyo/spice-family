import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center } from "@chakra-ui/react";
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import NumberEasing from 'react-number-easing';
import React, { useState } from 'react';
import './../App.css';
import banImg from './../images/ban.png';

const Result = () => {
    var [leftScore, setLeftScore] = useState(1500);
    var [rightScore, setRightScore] = useState(1500);
    var newleftScore = 1600;
    var newrightScore = 1400;
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
                                        <p style={{ fontWeight: "700", fontSize: "50px" }}><NumberEasing speed={3000} style="font-weight: bold;"
                                            ease='quintInOut' value={leftScore} fontSize="50px" color="black" /></p>

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
                                        <p style={{ fontWeight: "700", fontSize: "50px" }}><NumberEasing speed={3000} style="font-weight: bold;"
                                            ease='quintInOut' value={rightScore} fontSize="50px" color="black" /></p>
                                        <Spacer />
                                    </HStack>
                                </Box>
                            </VStack>
                            <Spacer></Spacer>
                        </Flex>

                    </HStack >
                    <Button m="20px" colorScheme=" blue" variant="solid" w="400px" h="70px" borderRadius={25} onClick={() => { setLeftScore(newleftScore); setRightScore(newrightScore); }}>
                        <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">終了</Text>
                    </Button>
                </Box>
            </header>
        </div >
    )
}

export default Result