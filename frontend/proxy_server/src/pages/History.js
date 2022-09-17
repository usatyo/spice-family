import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, Spacer, VStack, Box, Button, Stack, HStack, Flex, Text, Center, Image } from "@chakra-ui/react";
import { auth } from "../Firebase.js";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { signOut } from 'firebase/auth';


const History = () => {
    const [cats, setCats] = useState("");
    const [dogs, setDogs] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/').then(response => {
            console.log(response)
            console.log(response.data)
            setCats(response.data);
        });
    }, []);


    useEffect(() => {
        const idToken = localStorage.getItem('token')
        console.log(idToken)
        console.log("nnnnnnnnnnnn")
        axios.get('http://127.0.0.1:8000/' + 'me', {
            headers: {
                Authorization: `Bearer ${idToken}`,
                body: 'Hi, everyone!'
            }
        }).then(
            response => {
                console.log(dogs)
                setDogs(response.data)
                console.log("fkajsdlh")
                console.log(dogs)
                console.log("aa")
            }
        ).catch(error => {
            console.log(error.response.data)
            console.log(error.response.status)
            if (error.response.status === 401) {
                console.log("hellooooo")
                console.log(error.response.data.detail.indexOf("Token expired"))
                if (error.response.data.detail.indexOf("Token expired") !== -1) {
                    console.log("token has expired")
                    const axios = require('axios');

                    let refreshToken = localStorage.getItem('refresh_token')
                    const response = axios.post(
                        `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
                        `grant_type=refresh_token&refresh_token=${refreshToken}`,
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    ).then((response) => {
                        localStorage.removeItem('token')
                        localStorage.setItem('token', response.data.access_token)
                        localStorage.removeItem('refresh_token')
                        localStorage.setItem('refresh_token', response.data.refresh_token)
                        const time = Date()
                        localStorage.removeItem('refresh_at')
                        localStorage.setItem('refresh_at', time)
                        axios(error.config);
                        window.location.reload();

                    }).catch(async () => {
                        await signOut(auth);
                        navigate("/login")
                    })
                }
            }
        });

    }, []);


    console.log("kdfjsasda")
    console.log(dogs)


    return (
        <>
            <div className="bg-dark" style={{ minHeight: '100vh' }}>
                <div className="p-5">
                    {cats}
                </div>
                <div>
                    {dogs}
                </div>
            </div>
        </>
    );
}

export default History
