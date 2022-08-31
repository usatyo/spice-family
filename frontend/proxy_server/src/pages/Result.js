import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import NumberEasing from 'react-number-easing';
import React, { useState } from 'react';
import './../App.css';
import './Result.css';


const upIcon = <TriangleUpIcon w="50px" h="50px" color="red.500" />;
const downIcon = <TriangleDownIcon w="50px" h="50px" color="blue.500" />;

const Result = () => {
    var winner = "left";
    var oldLeftScore = 1532;
    var oldRightScore = 1490;
    var newleftScore = 1600;
    var newrightScore = 1420;
    var [leftScore, setLeftScore] = useState(oldLeftScore);
    var [rightScore, setRightScore] = useState(oldRightScore);
    let leftDist = newleftScore - oldLeftScore;
    let rightDist = newrightScore - oldRightScore;
    //do after 1 seconds
    setTimeout(() => {
        setLeftScore(newleftScore); setRightScore(newrightScore);
    }, 1 * 1000);


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
                                <Text p="10px" fontSize="50px" fontWeight="bold" color={(winner == "left") ? "red.500" : "blue.500"} >{(winner == "left") ? "WINNER" : "LOSER"}</Text>
                                <Box p={4} transition="0.5s" bg="white" border="2px" borderColor="white" shadow="xl" rounded="41px" w="500px" h="300px" margin={"0%"}>
                                    <VStack spacing="0" h="full" >
                                        <Box bg={"black"} rounded="full" w="full" h="50px">
                                            <Center h='100%'>
                                                <Text letterSpacing={2} fontSize="25px" fontWeight="bold" color="white">RATING</Text>
                                            </Center>
                                        </Box>
                                        <HStack paddingTop="20px">
                                            <Spacer />
                                            {(leftDist >= 0) ? upIcon : downIcon}
                                            <p style={{ fontWeight: "700", fontSize: "70px" }}><NumberEasing speed={Math.abs(leftDist * 50)} style="font-weight: bold;"
                                                ease='quintInOut' value={leftScore} fontSize="50px" color="black" /></p>
                                            <Spacer />
                                        </HStack>
                                        <HStack  >
                                            <Spacer />
                                            <p class="diffText" >{(leftDist >= 0) ? "+" + leftDist : leftDist}</p>
                                            <Spacer />
                                        </HStack>
                                    </VStack>
                                </Box>
                            </VStack>

                            <Spacer></Spacer>
                        </Flex>
                        {/* 右のプレイヤー */}
                        <Flex w="full" align="center">
                            <Spacer></Spacer>
                            <VStack>
                                <Text p="10px" fontSize="50px" fontWeight="bold" color={(winner == "right") ? "red.500" : "blue.500"} >{(winner == "right") ? "WINNER" : "LOSER"}</Text>
                                <Box p={4} transition="0.5s" bg="white" border="2px" borderColor="white" shadow="xl" rounded="41px" w="500px" h="300px" margin={"0%"}>
                                    <VStack spacing="0" h="full" >
                                        <Box bg={"white"} border="2px" borderColor="black" rounded=" full" w="full" h="50px">
                                            <Center h='100%'>
                                                <Text letterSpacing={2} fontSize="25px" fontWeight="bold" color="black">RATING</Text>
                                            </Center>
                                        </Box>;
                                        <HStack paddingTop="20px">
                                            <Spacer />
                                            {(rightDist >= 0) ? upIcon : downIcon}
                                            <p style={{ fontWeight: "700", fontSize: "70px" }}>
                                                <NumberEasing speed={Math.abs(rightDist * 50)} style="font-weight: bold;"
                                                    ease='quintInOut' value={rightScore} fontSize="50px" color="black" /></p>
                                            <Spacer />
                                        </HStack>
                                        <HStack  >
                                            <Spacer />
                                            <p class="diffText" >{(rightDist >= 0) ? "+" + rightDist : rightDist}</p>
                                            <Spacer />
                                        </HStack>
                                    </VStack>
                                </Box>
                            </VStack>
                            <Spacer></Spacer>
                        </Flex>

                    </HStack >
                    <Link to="/Home">
                        <Button m="20px" colorScheme=" blue" variant="solid" w="400px" h="70px" borderRadius={25} onClick={() => { }}>
                            <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">終了</Text>
                        </Button>
                    </Link>

                </Box>
            </header >
        </div >
    )
}

export default Result