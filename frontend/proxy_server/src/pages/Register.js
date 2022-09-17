import React, { useState, useEffect } from "react";
import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center, Input } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, user } from "../Firebase";
import { Navigate, Link } from "react-router-dom";
import './../App.css';


const Register = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
        } catch (error) {
            alert("正しく入力してください");
        }
    };

    const [user_state, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    if (user_state !== null) {
        localStorage.setItem('token', user_state.accessToken)
        localStorage.setItem('refresh_token', user_state.refreshToken)
        let tkn = localStorage.getItem('token')
        console.log(tkn)
    }

    return (
        <>
            {user_state ? (
                <Navigate to={`/`} />
            ) : (
                <>
                    <Box className="App" bg={'#e9e9e9'}>
                        <Stack h='full' w='full'>
                            <Center>
                                <Box w={450} bg={"white"} p={8}>
                                    <Text fontSize={25} mb={10}>新規登録</Text>
                                    <Spacer></Spacer>
                                    <FormControl onSubmit={handleSubmit} mb={6}>
                                        <FormLabel>メールアドレス</FormLabel>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={registerEmail}
                                            onChange={(e) => setRegisterEmail(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>パスワード</FormLabel>
                                        <Input
                                            name="password"
                                            type="password"
                                            value={registerPassword}
                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                        />
                                    </FormControl>
                                    <Button w={40} mt={10} mb={10}>登録する</Button>
                                    <Spacer></Spacer>
                                </Box>
                            </Center>
                            <Text>ログインは<Link to={`/login/`}>こちら</Link></Text>
                        </Stack>
                    </Box>
                </>
            )}
        </>
    );
};

export default Register;