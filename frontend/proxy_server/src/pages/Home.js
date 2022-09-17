import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, Spacer, VStack, Box, Button, Stack, HStack, Flex, Text, Center, Image } from "@chakra-ui/react";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase.js";
import { sendToken } from "../utils/api"
import MyChart from '../components/MyChart'

import { TimeIcon } from '@chakra-ui/icons'

const Home = () => {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    const navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate("/login");
    }

    return (
        <>
            {!loading && (
                <>
                    {!user ? (
                        <Navigate to={`/login/`} />
                    ) : (
                        <>
                            <div className="App" >
                                <header className="App-header">
                                    <VStack>
                                        <Button onClick={logout}>ログアウト</Button>
                                        <HStack p="40px" paddingRight="0" w="full" spacing={10}>
                                            {/*左側の部分  */}
                                            <Stack w="40%" h="full" paddingTop="40px" paddingRight="50px" paddingLeft="50px" >
                                                <Text color="gray.600" fontSize="3xl" textAlign={"left"} fontWeight="bold" >白黒の世界に彩りを</Text>
                                                <Text color="blue.400" fontSize="5xl" textAlign={"left"} fontWeight="bold">プロ棋士サーバ</Text>
                                                <Text color="gray.500" fontSize="xl" textAlign={"left"} fontWeight="bold">ここにアプリの簡単な説明ここにアプリの簡単な説明ここにアプリの簡単な説明ここにアプリの簡単な説明ここにアプリの簡単な説明ここにアプリの簡単な説明ここにアプリの簡単な</Text>
                                                <Link to="/prepare" >
                                                    <HStack paddingTop="10px">
                                                        <Button colorScheme="blue" variant="solid" w="200px" h="50px" borderRadius="25px" alignContent="left" shadow="lg" >
                                                            <HStack>
                                                                <TimeIcon w={7} h={7} color="white.500" />
                                                                <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">
                                                                    対局準備</Text>
                                                            </HStack>
                                                        </Button>
                                                        <Spacer />
                                                    </HStack>

                                                </Link>
                                                <Box paddingTop="50px" paddingBottom="10px">
                                                    <Box w="full" h="2px" bg="gray.300" />
                                                </Box>

                                                <Text p="4px" fontSize="20px" textAlign={"left"} color="gray.400">Created by SpiceFamily</Text>

                                            </Stack>

                                            {/*右側の部分  */}
                                            <Stack bg={" white"} shadow="lg" roundedLeft="25px" w="60%">
                                                <HStack>
                                                    <Box w="350px" bg="blue.400" roundedBottomRight="25px" roundedTopLeft="25px">
                                                        <Text p="10px" fontSize="20px" fontWeight="bold" color="white">プレイヤーのレーティング推移</Text>
                                                    </Box>
                                                    <Text p="4px" fontSize="20px" fontWeight="bold" color="gray.600">北大囲碁部</Text>
                                                </HStack>
                                                <Box padding="30px" paddingTop="0px">
                                                    <MyChart />
                                                </Box>
                                            </Stack>

                                        </HStack>
                                    </VStack>
                                </header >
                            </div >
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default Home 