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
import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import './../App.css';
import banImg from './../assets/ban.png';
import Webcam from "react-webcam";
import { makeStyles } from "@material-ui/core/styles";
import { postMove, postName } from '../utils/utils';
import { AppContext } from '../contexts/AppContext';



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


var motijikan = 0;
var byoyomi = 0;
var kouryokaisuu = 0;
var hande = 0;
var startLeft = false;
var stoneAdv = 0;
var enemyID = "";



const Timer = () => {
  //ゲーム設定
  const location = useLocation();
  const { m, b, kk, h, s, ad, en } = location.state;
  motijikan = m * 60;
  byoyomi = b;
  kouryokaisuu = kk;
  hande = h;
  startLeft = s;
  stoneAdv = ad;//ハンデ戦で先においた石の数
  enemyID = en;//敵プレイヤーのID
  const { game_id } = useContext(AppContext)

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
  const [playState, setPlayState] = useState((startLeft) ? "left" : "right");//変数,コール
  const [playCount, setPlayCount] = useState(1);
  const [isPause, setIsPause] = useState(false);
  const { isOpen: isOpenEnd, onOpen: onOpenEnd, onClose: onCloseEnd } = useDisclosure();
  const { isOpen: isOpenTimeUp, onOpen: onOpenTimeUp, onClose: onCloseTimeUp } = useDisclosure();

  const [kouryoLeft, setKouryoLeft] = useState(kouryokaisuu);
  const [kouryoRight, setKouryoRight] = useState(kouryokaisuu);
  const [byoyomiStateLeft, setByoyomiStateLeft] = useState(0);//0:通常 1:秒読み 
  const [byoyomiStateRight, setByoyomiStateRight] = useState(0);//0:通常 1:秒読み 
  const [keyL, setKeyL] = useState(0)//タイマーリセット用
  const [keyR, setKeyR] = useState(0)

  const [boardImg, setBoardImg] = useState(banImg)

  useEffect(() => {
    const func = async () => {
      //   setBoardImg(await postMove(game_id, url))
      console.log(postName("takashi"))
    }
    func()
  }, [])

  //カメラ関連
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
      // sendImg(imageSrc);
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
              <Box w="0px">
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
                  {(() => {
                    if (byoyomiStateLeft == 1) {
                      return <Box marginStart={10}>
                        <Text fontSize={20} color="blue.500" >秒読みを開始します</Text>
                        <Text fontSize={30} color="blue.500" fontWeight="bold">残り{kouryoLeft}回</Text>
                      </Box>
                    }
                  })()}

                  <Box transition="0.5s" shadow={(playState == "left" && isPause == false) ? "xl" : "sm"} rounded=" full" padding={2}>
                    {(() => {
                      if (byoyomiStateLeft == 0) {
                        return <CountdownCircleTimer
                          size={250}
                          strokeWidth={10}
                          isPlaying={(playState == "left" && isPause == false)}
                          duration={motijikan}
                          colors={(playState == "left" && isPause == false) ? ["#5a97db", "#5a97db", "#f4d849", "#A30000"] : ["#777777", "#777777", "#777777", "#777777"]}
                          colorsTime={[3600, 600, 300, 0]}
                          onComplete={() => {
                            setByoyomiStateLeft(1);
                          }}
                        >
                          {renderTime}
                        </CountdownCircleTimer>
                      } else {
                        return <CountdownCircleTimer
                          size={250}
                          key={keyL}
                          strokeWidth={10}
                          isPlaying={(playState == "left" && isPause == false)}
                          duration={Math.max(byoyomi, byoyomi)}
                          colors={(playState == "left" && isPause == false) ? ["#5a97db", "#5a97db", "#f4d849", "#A30000"] : ["#777777", "#777777", "#777777", "#777777"]}
                          colorsTime={[3600, 600, 300, 0]}
                          onComplete={(kouryoLeft <= 1) ? onOpenTimeUp : () => {
                            setKouryoLeft(kouryoLeft - 1);
                            return { shouldRepeat: true, delay: 1, newInitialRemainingTime: byoyomi };
                          }}
                        >
                          {renderTime}
                        </CountdownCircleTimer>
                      }
                    })()}
                    {endTimeUpModal(isOpenTimeUp, onCloseTimeUp, playState)}
                  </Box>
                  <Box marginStart={10}>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">秒読み </Text>
                    <Text as="span" fontSize={40} color="blue.500" fontWeight="bold">{byoyomi}</Text>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">秒✗</Text>
                    <Text as="span" fontSize={40} color="gray.500" fontWeight="bold">{kouryoLeft}</Text>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">回</Text>
                  </Box>
                  <Spacer />
                  <Button transition="0.5s" colorScheme="blue" shadow="lg" variant="outline" border="2px" w="full" h="70px" borderRadius={25} disabled={(playState != "left" || isPause != false)} onClick={() => {
                    capture();
                    if (byoyomiStateLeft != 0) {
                      setKeyL(keyL + 1);//タイマーリセット
                      setByoyomiStateLeft(1);
                    }
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
                    <img src={boardImg} w="full" />
                  </Box>
                  <Box w="full">
                    <HStack marginTop={4}>
                      <Button colorScheme="blue" border="2px" variant="outline" w="50%" h="70px" borderRadius={25} onClick={() => { setIsPause(!isPause) }}>
                        <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">{(isPause ? "再開" : "一時停止")}</Text>

                      </Button>
                      <Button colorScheme="blue" variant="solid" w="80%" h="70px" borderRadius={25} onClick={onOpenEnd}>
                        <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">終了</Text>
                      </Button>
                      {endModal(isOpenEnd, onCloseEnd, playState)}
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
                  {(() => {
                    if (byoyomiStateRight == 1) {
                      return <Box marginStart={10}>
                        <Text fontSize={20} color="blue.500" >秒読みを開始します</Text>
                        <Text fontSize={30} color="blue.500" fontWeight="bold">残り{kouryoRight}回</Text>
                      </Box>
                    }
                  })()}
                  <Box transition="0.5s" shadow={(playState == "right" && isPause == false) ? "xl" : "sm"} rounded="full" padding={2}>
                    {(() => {
                      if (byoyomiStateRight == 0) {
                        return <CountdownCircleTimer
                          size={250}
                          strokeWidth={10}
                          isPlaying={(playState == "right" && isPause == false)}
                          duration={motijikan}
                          colors={(playState == "right" && isPause == false) ? ["#5a97db", "#5a97db", "#f4d849", "#A30000"] : ["#777777", "#777777", "#777777", "#777777"]}
                          colorsTime={[3600, 600, 300, 0]}
                          onComplete={() => {
                            setByoyomiStateRight(1);
                          }}
                        >
                          {renderTime}
                        </CountdownCircleTimer>
                      } else {
                        return <CountdownCircleTimer
                          size={250}
                          key={keyR}
                          strokeWidth={10}
                          isPlaying={(playState == "right" && isPause == false)}
                          duration={Math.max(byoyomi, byoyomi)}
                          colors={(playState == "right" && isPause == false) ? ["#5a97db", "#5a97db", "#f4d849", "#A30000"] : ["#777777", "#777777", "#777777", "#777777"]}
                          colorsTime={[3600, 600, 300, 0]}
                          onComplete={(kouryoRight <= 1) ? onOpenTimeUp : () => {
                            setKouryoRight(kouryoRight - 1);
                            return { shouldRepeat: true, delay: 1, newInitialRemainingTime: byoyomi };
                          }}
                        >
                          {renderTime}
                        </CountdownCircleTimer>
                      }
                    })()}
                    {endTimeUpModal(isOpenTimeUp, onCloseTimeUp, playState)}
                  </Box>
                  <Box marginStart={10}>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">秒読み </Text>
                    <Text as="span" fontSize={40} color="blue.500" fontWeight="bold">{byoyomi}</Text>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">秒✗</Text>
                    <Text as="span" fontSize={40} color="gray.500" fontWeight="bold">{kouryoRight}</Text>
                    <Text as="span" fontSize={20} color="blue.500" fontWeight="bold">回</Text>
                  </Box>
                  <Spacer />
                  <Button transition="0.5s" colorScheme="blue" shadow="lg" variant="outline" border="2px" w="full" h="70px" borderRadius={25} disabled={(playState != "right" || isPause != false)} onClick={() => {
                    capture();
                    if (byoyomiStateRight != 0) {
                      setKeyR(keyR + 1);//タイマーリセット
                      setByoyomiStateRight(1);
                    }
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
    <ModalContent >
      <ModalHeader>終了しますか?</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        対局結果を選択してください。
      </ModalBody>
      <ModalFooter>
        <Link to="/result" state={{ ad: stoneAdv, leftResult: 2 }}>
          <Button colorScheme='blue' mr={3}>
            左の勝利
          </Button>
        </Link>
        <Link to="/result" state={{ ad: stoneAdv, leftResult: 1 }}>
          <Button variant="outline" colorScheme='blue' mr={3}>
            引き分け
          </Button>
        </Link>
        <Link to="/result" state={{ ad: stoneAdv, leftResult: 0 }}>
          <Button colorScheme='blue' mr={3}>
            右の勝利
          </Button>
        </Link>
      </ModalFooter >
    </ModalContent >
  </Modal >;
}



function endTimeUpModal(isOpen, onClose, playState) {//閉じれないようにする
  return <Modal isOpen={isOpen} onClose={null}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>時間切れになりました。</ModalHeader>
      <ModalBody>
        {(playState == "left") ? "左" : "右"}側のプレイヤーの敗北となります。
      </ModalBody>
      <ModalFooter>
        <Link to="/result" state={{ ad: stoneAdv, leftResult: (playState == "left") ? 0 : 2 }}>
          <Button colorScheme='blue' mr={3}>
            終了する
          </Button>
        </Link>
      </ModalFooter>
    </ModalContent>
  </Modal>;
}
