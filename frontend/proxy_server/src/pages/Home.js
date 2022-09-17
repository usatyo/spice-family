import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, Spacer, VStack, Box, Button, Stack, HStack, Flex, Text, Center, Image } from "@chakra-ui/react";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase.js";
import { sendToken } from "../utils/api"
import MyChart from '../components/MyChart'

import { TimeIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { transform } from 'framer-motion';

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

                                    <Stack p="40px" paddingRight="0" w="full" spacing={10} flexDirection="row">
                                        {/*左側の部分  */}
                                        <Stack w="40%" h="full" paddingTop="40px" paddingRight="50px" paddingLeft="50px" >
                                            <Text color="gray.600" fontSize="3xl" textAlign={"left"} fontWeight="bold" >白黒の世界に彩りを</Text>
                                            <Text color="blue.400" fontSize="5xl" textAlign={"left"} fontWeight="bold">プロ棋士サーバ</Text>
                                            <Text color="gray.500" fontSize="xl" textAlign={"left"} fontWeight="bold">対局を通して囲碁のスキルを磨き、より高いレートを目指しましょう。プロ棋士サーバを利用すれば、対局時計を用意する必要も棋譜を記憶する必要もありません！</Text>
                                            <HStack paddingTop="15px">
                                                <Link to="/prepare" >
                                                    <Button colorScheme="blue" variant="solid" w="200px" h="50px" borderRadius="25px" alignContent="left" shadow="lg" >
                                                        <HStack>
                                                            <TimeIcon w={7} h={7} color="white.500" />
                                                            <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">
                                                                対局準備</Text>
                                                        </HStack>
                                                    </Button>
                                                </Link>
                                            </HStack>
                                            <HStack paddingTop="15px">
                                                <Link to="/record" >
                                                    <Button colorScheme="blue" variant="outline" w="290px" h="50px" borderRadius="25px" alignContent="left" shadow="lg" >
                                                        <HStack>
                                                            <RepeatClockIcon w={7} h={7} color="white.500" />
                                                            <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">
                                                                直近の結果を見る</Text>
                                                        </HStack>
                                                    </Button>
                                                </Link>
                                            </HStack>

                                            <Box paddingTop="20px" paddingBottom="5px">
                                                <Box w="full" h="2px" bg="gray.300" />
                                            </Box>
                                            <HStack paddingTop="10px">
                                                <Link to="/record" >
                                                    <Button colorScheme="grey" variant="outline" w="150px" h="34px" borderRadius="25px" onClick={logout} alignContent="left">
                                                        <HStack>
                                                            <Text fontSize="lg">
                                                                ログアウト</Text>
                                                        </HStack>
                                                    </Button>
                                                </Link>
                                            </HStack>
                                            <Text p="4px" fontSize="20px" textAlign={"left"} color="gray.400">Created by SpiceFamily</Text>
                                        </Stack>

                                        {/*右側の部分  */}
                                        <Stack style={{ marginTop: 120 }} bg={" white"} shadow="lg" roundedLeft="25px" w="60%" h="min">
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
                                    </Stack >
                                </header >
                            </div >
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Home 