import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useLocation, BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import React, { useRef, useState, useCallback } from 'react';
import './../App.css';
import banImg from './../assets/ban.png';
import Webcam from "react-webcam";
import { makeStyles } from "@material-ui/core/styles";

//カメラを非表示にするために使用
const useStyles = makeStyles(() => ({
  webcam: {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
  },
}));

const logStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "user"
};

const renderTime = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60
  const padMin = ('00' + minutes).slice(-2);
  const padSec = ('00' + seconds).slice(-2);
  return (
    <div className="timer">
      <div className="value">{`${padMin}:${padSec}`}</div>
    </div>
  );
}



const pausing = <Box bg={"blue.500"} rounded="full" w="200px" h="50px">
  <Center h='100%'>
    <Text fontSize="25px" fontWeight="bold" color="white">停止中</Text>
  </Center>
</Box>;

function XOR(a, b) {
  return (a || b) && !(a && b);
}

function sendImg(url) {
}

var motijikan = 0;
var byoyomi = 0;
var kouryojikan = 0;
var kouryokaisuu = 0;
var hande = 0;
var startLeft = false;



const Timer = () => {
  //ゲーム設定
  const location = useLocation();
  const { m, b, kj, kk, h, s } = location.state;
  motijikan = m * 60;
  byoyomi = b;
  kouryojikan = kj;
  kouryokaisuu = kk;
  hande = h;
  startLeft = s;

  const [playState, setPlayState] = useState((startLeft) ? "left" : "right");//変数,コール
  const [playCount, setPlayCount] = useState(1);
  const [isPause, setIsPause] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  var leftBadge, rightBadge;
  //先手と後手のラベル
  const kuro = <Box bg={"black"} rounded="full" w="100px" h="50px">
    <Center h='100%'>
      <Text fontSize="25px" fontWeight="bold" color="white">{(hande == 2) ? "後手" : "先手"}</Text>
    </Center>
  </Box>;
  const siro = <Box bg={"white"} border='1px' borderColor='black' rounded="full" w="100px" h="48px">
    <Center h='100%'>
      <Text fontSize="25px" fontWeight="bold" color="black">{(hande == 2) ? "先手" : "後手"}</Text>
    </Center>
  </Box>;
  if (XOR(startLeft, hande == 2)) {
    leftBadge = kuro;
    rightBadge = siro;
  } else {
    leftBadge = siro;
    rightBadge = kuro;
  }


  //カメラ関連
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
      sendImg(imageSrc);
    }
  }, [webcamRef]);
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <Stack h="full" w="full">
          <Box paddingLeft="40px" w="full">
            <Text className='Title1' >Timer</Text>
            <Text className='normal' >対局を行いましょう。</Text>
          </Box>
          <Webcam
            audio={false}
            width={1920}
            height={1080}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className={classes.webcam}
          />
          {url && (
            <>
              <Box w="100px">
                <img src={url} alt="Screenshot" />
              </Box>
            </>
          )}
          <AspectRatio transform="perspective(600px) rotateX(0deg) scale(1,1)" w="full" ratio={16 / 9} >
            <HStack p={10} spacing={4}>
              {/* 左のプレイヤー(playState=0) */}
              <Box p={4} transition="0.5s" bg="white" border="2px" borderColor={(playState == "left" && isPause == false) ? "white" : "white"} shadow={(playState == "left" && isPause == false) ? "xl" : "sm"} rounded="41px" w="1000px" h="full" margin={"0%"}>
                <VStack h="full">
                  <HStack w="full">
                    {leftBadge}
                    <Spacer />
                  </HStack>
                  <Spacer />
                  <Box transition="0.5s" shadow={(playState == "left" && isPause == false) ? "xl" : "sm"} rounded=" full" padding={2}>
                    <CountdownCircleTimer
                      size={250}
                      strokeWidth={10}
                      isPlaying={(playState == "left" && isPause == false)}
                      duration={motijikan}
                      colors={(playState == "left" && isPause == false) ? ["#5a97db", "#5a97db", "#f4d849", "#A30000"] : ["#777777", "#777777", "#777777", "#777777"]}
                      colorsTime={[60, 20, 10, 0]}
                      onComplete={() => { }}
                    >
                      {renderTime}
                    </CountdownCircleTimer>
                  </Box>
                  <Box marginStart={10}>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">秒読み </Text>
                    <Text as="span" fontSize={40} color="blue.500" fontWeight="bold">{byoyomi}</Text>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">秒</Text>
                  </Box>
                  <Box marginStart={10}>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">考慮回数 </Text>
                    <Text as="span" fontSize={40} color="blue.500" fontWeight="bold">{kouryojikan}</Text>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">秒✗</Text>
                    <Text as="span" fontSize={40} color="gray.500" fontWeight="bold">{kouryokaisuu}</Text>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">回</Text>
                  </Box>
                  <Spacer />
                  <Button transition="0.5s" colorScheme="blue" shadow="lg" variant="outline" border="2px" w="full" h="70px" borderRadius={25} disabled={(playState != "left" || isPause != false)} onClick={() => {
                    capture();
                    setPlayState("right");
                    setPlayCount(playCount + 1);
                  }}>
                    <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">着手</Text>
                  </Button>
                </VStack>
              </Box>
              {/* 真ん中のところ */}
              <Box w="full" h="full" >
                <VStack spacing={0} h="full">
                  <>{(isPause) ? pausing : ((playState == "left") ? leftBadge : rightBadge)}</>
                  <Box>
                    <Text as="span" fontSize={60} color="blue.500" fontWeight="bold">{playCount}</Text>
                    <Text as="span" fontSize={30} color="blue.500" fontWeight="bold">手目</Text>
                  </Box>
                  <Box p={10} bg="white" shadow="lg" borderRadius={10} padding="10px">
                    <img src={banImg} w="full" />
                  </Box>
                  <Box w="full">
                    <HStack marginTop={4}>
                      <Button colorScheme="blue" border="2px" variant="outline" w="50%" h="70px" borderRadius={25} onClick={() => { setIsPause(!isPause) }}>
                        <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">{(isPause ? "再開" : "一時停止")}</Text>
                      </Button>
                      <Button colorScheme="blue" variant="solid" w="80%" h="70px" borderRadius={25} onClick={onOpen}>
                        <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">終了</Text>
                      </Button>
                      {endModal(isOpen, onClose, playState)}
                    </HStack>
                  </Box>

                </VStack>

              </Box>
              {/* 右のプレイヤー */}
              <Box p={4} transition="0.5s" bg="white" border="2px" borderColor={(playState == "right" && isPause == false) ? "white" : "white"} shadow={(playState == "right" && isPause == false) ? "xl" : "sm"} rounded="41px" w="1000px" h="full" margin={"0%"}>
                <VStack h="full">
                  <HStack w="full">
                    {rightBadge}
                    <Spacer />
                  </HStack>
                  <Spacer />
                  <Box transition="0.5s" shadow={(playState == "right" && isPause == false) ? "xl" : "sm"} rounded="full" padding={2}>
                    <CountdownCircleTimer
                      size={250}
                      strokeWidth={10}
                      isPlaying={(playState == "right" && isPause == false)}
                      duration={motijikan}
                      colors={(playState == "right" && isPause == false) ? ["#5a97db", "#5a97db", "#f4d849", "#A30000"] : ["#777777", "#777777", "#777777", "#777777"]}
                      colorsTime={[60, 20, 10, 0]}
                      onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                    >
                      {renderTime}
                    </CountdownCircleTimer>
                  </Box>
                  <Box marginStart={10}>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">秒読み </Text>
                    <Text as="span" fontSize={40} color="blue.500" fontWeight="bold">{byoyomi}</Text>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">秒</Text>
                  </Box>
                  <Box marginStart={10}>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">考慮回数 </Text>
                    <Text as="span" fontSize={40} color="blue.500" fontWeight="bold">{kouryojikan}</Text>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">秒✗</Text>
                    <Text as="span" fontSize={40} color="gray.500" fontWeight="bold">{kouryokaisuu}</Text>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">回</Text>
                  </Box>
                  <Spacer />
                  <Button transition="0.5s" colorScheme="blue" shadow="lg" variant="outline" border="2px" w="full" h="70px" borderRadius={25} disabled={(playState != "right" || isPause != false)} onClick={() => {
                    capture();
                    setPlayState("left");
                    setPlayCount(playCount + 1);
                  }}>
                    <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">着手</Text>
                  </Button>
                </VStack>
              </Box>
            </HStack >
          </AspectRatio >
        </Stack>

      </header >

    </div >
  )
}

export default Timer

function endModal(isOpen, onClose, playState) {
  return <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>終了しますか?</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {playState}側のプレイヤーの敗北となります。
      </ModalBody>
      <ModalFooter>
        <Button variant='ghost' onClick={onClose}>続ける</Button>
        <Link to="/result">
          <Button colorScheme='blue' mr={3}>
            終了する
          </Button>
        </Link>
      </ModalFooter>
    </ModalContent>
  </Modal>;
}
