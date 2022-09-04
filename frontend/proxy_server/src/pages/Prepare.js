import { AspectRatio, Heading, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, HStack, Stack, Flex, Text, Center, Image, Radio, RadioGroup, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper } from "@chakra-ui/react";
import React, { useRef, useState, useCallback } from 'react';
import './../App.css';
import '../styles/Prepare.css';
import img from './../assets/prepare.png';
import { Link } from 'react-router-dom';
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user"
};

const Prepare = () => {
    const [handeMode, setHandeMode] = React.useState("0");
    const [startLeft, setStartLeft] = React.useState("true");
    const [motijikan, setMatijikan] = React.useState("40");
    const [byoyomi, setByoyomi] = React.useState("30");
    const [kouryojikan, setKouryojikan] = React.useState("60");
    const [kouryokaisuu, setKouryokaisuu] = React.useState("3");
    //カメラ関連
    const webcamRef = useRef(null);
    return (
        <div className="App">
            <header className="App-header">
                <Stack spacing="30px" p="40px" w={"full"}>
                    < Box >
                        <div className="Title1">Prepare</div>
                        <Text p="4px" textAlign={"left"} fontSize="20px" color="black">対局を開始します。準備を行ってください。</Text>
                    </Box>
                    {/* カメラ設定の枠 */}
                    <Box p={6} transition="0.5s" bg="white" shadow="xl" rounded="40px"  >
                        <HStack h="full">
                            <Box w="50%" h="full">
                                <div className='Title2'>PCの設置</div>
                                <div className='normal'>・図のように、碁盤の横にこのPCを設置してください。<br />・このとき、PCのWebカメラの映像に碁盤全体が映るようにPCのヒンジの角度を調節してください。<br />・カメラに映る場所に碁盤以外のものを置かないでください。</div>
                                <VStack>
                                    <Image
                                        boxSize="160px"
                                        src={img}
                                    />
                                </VStack>
                            </Box>/
                            {/* カメラのプレビュー */}
                            <Box overflow="hidden" float="right" p={0} bg="gray.50" border="2px" borderColor="blue.200" w="50%" rounded="34px">
                                <Webcam
                                    audio={false}
                                    width="full"
                                    height="full"
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                />
                            </Box>
                        </HStack>
                    </Box>

                    <Stack direction='row' spacing="30px">
                        <VStack spacing="30px" w="50%">
                            {/* 時間設定の枠 */}
                            <Box p={6} paddingRight={10} transition="0.5s" bg="white" shadow="xl" rounded="40px" margin={"0%"} w="full">
                                <div className='Title2'>時間設定</div>
                                <HStack>
                                    <div className='normal'>・持ち時間</div>
                                    <Spacer />
                                    <NumberInput w="100px" step={5} defaultValue={30} min={0} max={100} value={motijikan} onChange={(value) => { setMatijikan(value) }}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <div className='normal'>分</div>
                                </HStack>
                                <HStack>
                                    <div className='normal'>・秒読み</div>
                                    <Spacer />
                                    <NumberInput w="100px" step={5} defaultValue={30} min={0} max={60} value={byoyomi} onChange={(value) => { setByoyomi(value) }}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <div className='normal'>秒</div>
                                </HStack>
                                <HStack>
                                    <div className='normal'>・考慮回数</div>
                                    <Spacer />
                                    <NumberInput w="100px" step={10} defaultValue={40} min={0} max={120} value={kouryojikan} onChange={(value) => { setKouryojikan(value) }}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <div className='normal'>秒 ✗</div>
                                    <NumberInput w="100px" defaultValue={3} min={0} max={20} value={kouryokaisuu} onChange={(value) => { setKouryokaisuu(value) }}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <div className='normal'>回</div>
                                </HStack>

                            </Box>
                            {/* 先手の枠 */}
                            <Box p={6} paddingRight={10} transition="0.5s" bg="white" shadow="xl" rounded="40px" margin={"0%"} w="full">
                                <div className='Title2'>先手</div>
                                {senteRadio(setStartLeft, startLeft)}
                            </Box>
                        </VStack>
                        <VStack spacing="30px" w="50%">
                            {/* ハンデ設定の枠 */}
                            <Box p={6} paddingRight={10} transition="0.5s" bg="white" shadow="xl" rounded="40px" margin={"0%"} w="full">
                                <div className='Title2'>ハンデ設定</div>
                                <Stack direction='row'>
                                    <div className='normal'>・対戦形式</div>
                                    <Spacer />
                                    {handeRadio(setHandeMode, handeMode)}
                                </Stack>
                            </Box>
                        </VStack>

                    </Stack>
                    <Link to="/timer" state={{ m: parseInt(motijikan), b: parseInt(byoyomi), kj: parseInt(kouryojikan), kk: parseInt(kouryokaisuu), h: parseInt(handeMode), s: (startLeft == "true") }}>
                        <Button colorScheme="blue" variant="solid" w="100%" h="80px" borderRadius="40px" >
                            <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">対局開始</Text>
                        </Button>
                    </Link>

                </Stack >
            </header >
        </div >
    )
}

export default Prepare

function handeRadio(setHandeMode, handeMode) {
    return <RadioGroup onChange={setHandeMode} value={handeMode}>
        <Stack direction='column'>
            <Radio size='lg' value={'0'}>互戦</Radio>
            <Radio size='lg' value={'1'}>定戦</Radio>
            <Radio size='lg' value={'2'}>ハンデ戦</Radio>
        </Stack>
    </RadioGroup>;
}

function senteRadio(setStartLeft, startLeft) {
    return <RadioGroup onChange={setStartLeft} value={startLeft}>
        <Stack direction='row'>
            <Radio size='lg' value={'true'}>左のプレイヤー</Radio>
            <Spacer />
            <Radio size='lg' value={'false'}>右のプレイヤー</Radio>
        </Stack>
    </RadioGroup>;
}
