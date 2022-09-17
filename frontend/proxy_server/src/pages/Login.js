import React, { useState, useEffect } from "react";
import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center, Input } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../Firebase.js";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch (error) {
            alert("メールアドレスまたはパスワードが間違っています");
        }
    };

    const [user_state, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    });

    console.log(user_state)

    if (user_state !== null) {
        localStorage.setItem('token', user_state.accessToken)
        localStorage.setItem('refresh_token', user_state.refreshToken)
        const time = Date()
        console.log(time)
        localStorage.setItem('refresh_at', time)
        let tkn = localStorage.getItem('token')
        console.log(tkn)
    }

    return (
        <>
            {/* ↓ログインしている場合、マイページにリダイレクトする設定 */}
            {user_state ? (
                <Navigate to={`/`} />
            ) : (
                <>
                    <div className="App" >
                        <header className="App-header">
                            <VStack w="25%" h="40%" margin="auto" paddingTop="30px" paddingBottom="30px" bg="white" rounded={25}>
                                <Text fontSize={30} paddingBottom="20px">Login</Text>
                                    <form>
                                        <FormControl isRequired paddingBottom="10px">
                                            <FormLabel>メールアドレス</FormLabel>
                                            <Input
                                                name="email"
                                                type="email"
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormControl isRequired paddingBottom="30px">
                                            <FormLabel>パスワード</FormLabel>
                                            <Input
                                                name="password"
                                                type="password"
                                                value={loginPassword}
                                                onChange={(e) => setLoginPassword(e.target.value)}
                                            />
                                        </FormControl>
                                        <Button width="full" marginTop="4px" type="submit" onClick={handleSubmit}>ログイン</Button>
                                    </form>
                                <Link to={`/register/`}>
                                    <Text fontSize={14} paddingTop="10px">新規登録はこちら</Text>
                                </Link>
                            </VStack>
                        </header>
                    </div>
                </>
            )
            }
        </>
    );
};

export default Login;