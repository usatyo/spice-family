import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, Spacer, VStack, Box, Button, Stack, HStack, Flex, Text, Center, Image } from "@chakra-ui/react";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase.js";
import { sendToken } from "../utils/api"
import MyChart from '../components/MyChart'
import TimerSvg from '../assets/timer.svg'


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
                                    <VStack ml={100} mt={50}>
                                        <HStack mb={30}>
                                            <Link to='/prepare'>
                                                <Button p={4} bg={"white"} shadow="lg" rounded="20px" w="120px" h="120px">
                                                    <Image src={TimerSvg} h={75} />
                                                </Button>
                                            </Link>
                                            <Link to='/history'>
                                                <Button bg={"white"} onClick={sendToken}>
                                                </Button>
                                            </Link>
                                            <Box pl={270} pr={230} color={'#59A4CB'} fontSize="7xl" fontWeight="bold" >プロ棋士サーバ</Box>
                                            <Spacer></Spacer>
                                            <Box pt={3} pl={4} bg={"white"} color={"black"} fontSize={17} textAlign={"left"} shadow="lg" rounded="10px" w="180px" h="50px">{user?.email}</Box>
                                            <button onClick={logout}>ログアウト</button>
                                        </HStack>
                                        <Stack p={12} bg={"white"} shadow="lg" rounded="20px" w="900px" h="450px">
                                            <MyChart />
                                        </Stack>
                                    </VStack>
                                </header>
                            </div >
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default Home 