import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { Button, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../contexts/AppContext"
import { getRecordPath, postNewGame } from "../utils/utils"
import banImg from "../assets/ban.png"


const Record = () => {
    const [recordImg, setRecordImg] = useState(banImg)
    const [turn, setTurn] = useState(0)
    const {
        game_id,
    } = useContext(AppContext)
    console.log(game_id)

    useEffect(() => {
        postNewGame("aaa", "bbb", 0)
        const func = async () => {
            setRecordImg(await getRecordPath(4, turn))
        }
        func()
    }, [turn])

    return (<>
        <HStack justify="center" backgroundColor="#cccccc" height="100vh">
            <Image
                src={recordImg}
                margin="20px"
                height="90vh"
            />
            <VStack spacing="20px">
                <VStack
                    backgroundColor="#555555"
                    color="white"
                    width="300px"
                    borderRadius="10px"
                    padding="20px"
                >
                    <Text fontSize="16px">black</Text>
                    <Text fontSize="20px">usatyo</Text>
                </VStack>
                <VStack
                    backgroundColor="#ffffff"
                    width="300px"
                    borderRadius="10px"
                    padding="20px"
                >
                    <Text fontSize="16px">white</Text>
                    <Text fontSize="20px">usatyo</Text>
                </VStack>
                <HStack spacing="20px">
                    <Button onClick={() => setTurn(Math.min(0, turn - 1))}>
                        <ArrowLeftIcon />
                    </Button>
                    <Button onClick={() => console.log(recordImg)}>
                        <ArrowRightIcon />
                    </Button>
                </HStack>
                <Link to='/'>
                    <Button colorScheme="blue" variant="solid" w="300px" h="50px" borderRadius="full">
                        <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">終了</Text>
                    </Button>
                </Link>
            </VStack>
        </HStack>
    </>)
}

export default Record