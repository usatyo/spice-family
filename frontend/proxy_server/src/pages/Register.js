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
                    <div className="App" >
                        <header className="App-header">
                            <VStack w="25%" h="40%" margin="auto" paddingTop="30px" paddingBottom="30px" bg="white" rounded={25}>
                                <Text fontSize={30} paddingBottom="20px">Register</Text>
                                    <form>
                                        <FormControl isRequired paddingBottom="10px">
                                            <FormLabel>メールアドレス</FormLabel>
                                            <Input
                                                name="email"
                                                type="email"
                                                value={registerEmail}
                                                onChange={(e) => setRegisterEmail(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl isRequired paddingBottom="30px">
                                            <FormLabel>パスワード</FormLabel>
                                            <Input
                                                name="password"
                                                type="password"
                                                value={registerPassword}
                                                onChange={(e) => setRegisterPassword(e.target.value)}
                                            />
                                        </FormControl>
                                        <Button width="full" marginTop="4px" type="submit" onClick={handleSubmit}>ログイン</Button>
                                    </form>
                                <Link to={`/login/`}>
                                    <Text fontSize={14} paddingTop="10px">ログインはこちら</Text>
                                </Link>
                            </VStack>
                        </header>
                    </div>
                </>
            )}
        </>
    );
};

export default Register;