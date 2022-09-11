import React, { useState, useEffect } from "react";
import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center } from "@chakra-ui/react";
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
                    <h1>ログインページ</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>メールアドレス</label>
                            <input
                                name="email"
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>パスワード</label>
                            <input
                                name="password"
                                type="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <button>ログイン</button>
                        <p>新規登録は<Link to={`/register/`}>こちら</Link></p>
                    </form>
                </>
            )}
        </>
    );
};

export default Login;