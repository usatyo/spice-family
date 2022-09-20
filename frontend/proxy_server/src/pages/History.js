import React, { useState, useEffect } from 'react';
import { AspectRatio, ChakraProvider, Spacer, VStack, Box, Button, Stack, HStack, Flex, Text, Center, Image } from "@chakra-ui/react";
import { auth } from "../Firebase.js";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { postName } from '../utils/utils.js';

const baseUrl = "https://prokishi-serve.herokuapp.com"

const History = () => {
    const [cats, setCats] = useState("");
    const [dogs, setDogs] = useState("");
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get(baseUrl + "/").then(response => {
    //         console.log(response)
    //         console.log(response.data)
    //         setCats(response.data);
    //     });
    // }, []);


    useEffect(() => {
        postName("akiko")
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
