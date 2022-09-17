import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../contexts/AppContext"
import { getRecordPath, postNewGame } from "../utils/utils"


const Record = () => {
  const [recordImg, setRecordImg] = useState("")
  const [turn, setTurn] = useState(0)
  const {
    game_id,
  } = useContext(AppContext)
  useEffect(() => {
    postNewGame("aaa", "bbb")
    const func = async () => {
      setRecordImg(await getRecordPath(1, turn))
    }
    func()
  }, [])

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
          <Button onClick={() => setTurn(turn + 1)}>
            <ArrowRightIcon />
          </Button>
        </HStack>
      </VStack>
    </HStack>
  </>)
}

export default Record