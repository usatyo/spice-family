import axios from "axios"

const baseUrl = "http://localhost:8000"


export const postNameAndId = async (user_id, name) => {
  try {
    const res = await axios.post(baseUrl + `/post/name?user_id=${user_id}&name=${name}`)
    console.log(res)
  } catch (err) {
    console.log("err:", err)
  }
}

export const postNewGame = async (black_id, white_id) => {
  try {
    const res = await axios.post(baseUrl + `/post/start_game?black=${black_id}&white=${white_id}`)
    console.log(res)
    return res
  } catch (err) {
    console.log("err:", err)
  }
}

export const postResult = async (game_id, result) => {
  try {
    const res = await axios.post(baseUrl + `/post/result?game_id=${game_id}&result=${result}`)
    console.log(res)
  } catch (err) {
    console.log("err:", err)
  }
}

export const getRateFromId = async (user_id) => {
  try {
    const res = await axios.get(baseUrl + `/get/rate?id=${user_id}`)
    console.log(res)
    return res
  } catch (err) {
    console.log("err:", err)
  }
}

export const getAllRate = async (user_id) => {
  try {
    const res = await axios.get(baseUrl + `/get/rate_hist?id=${user_id}`)
    console.log(res)
    return res
  } catch (err) {
    console.log("err:", err)
  }
}

export const getResult = async (user_id) => {
  try {
    const res = await axios.get(baseUrl + `/get/result?id=${user_id}`)
    console.log(res)
    return res
  } catch (err) {
    console.log("err:", err)
  }
}

export const getRecordPath = async (game_id, turn) => {
  try {
    const res = await axios.get(baseUrl + `/get/game_record?game_id=${game_id}&turn=${turn}`, { responseType: 'arraybuffer' })
    const blob = new Blob([res.data], { type: 'image/png' })
    const url = window.URL || window.webkitURL
    return url.createObjectURL(blob)
  } catch (err) {
    console.log("err:", err)
  }
}