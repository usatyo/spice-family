import axios from "axios"
import { useContext } from "react"

const baseUrl = "http://localhost:8000"

const {
  gameId,
  setGameId,
} = useContext(AppContext)

export const postNameAndId = async (user_id, name) => {
  return await axios.post(baseUrl + `/post/name?user_id=${user_id}&name=${name}`)
    .then((res) => {
      console.log("done name and id")
    })
    .catch((err) => {
      console.log("err:", err)
    })
}

export const postNewGame = async (black_id, white_id) => {
  return await axios.post(baseUrl + `/post/start_game?black=${black_id}&white=${white_id}`)
    .then((res) => {
      setGameId(res.data.game_id)
      console.log("done new game")
    })
    .catch((err) =>{
      console.log("err:", err)
    })
}

export const postResult = async (result) => {
  return await axios.post(baseUrl + `/post/result?game_id=${gameId}&result=${result}`)
    .then((res) => {
      console.log("done result")
    })
    .catch((err) => {
      console.log("err:", err)
    })
}

export const getRateFromId = async (user_id) => {
  return await axios.get(baseUrl + `/get/rate?id=${user_id}`)
    .then((res) => {
      console.log("done rate")
      return res.data.rate
    })
    .catch((err) => {
      console.log("err:", err)
    })
}

export const getAllRate = async (user_id) => {
  return await axios.get(baseUrl + `/get/all_rate?id=${user_id}`)
    .then((res) => {
      console.log("done all rate")
      return res.data
    })
    .catch((err) => {
      console.log("err:", err)
    })
}

export const getResult = async (user_id) => {
  return await axios.get(baseUrl + `/get/result?id=${user_id}`)
    .then((res) => {
      console.log("done all result")
      return res.data
    })
    .catch((err) => {
      console.log("err:", err)
    })
}