import axios from "axios"
import { signOut } from 'firebase/auth';
import { auth } from "../Firebase.js";

const baseUrl = "http://localhost:8000"


const errorHandling = (error) => {
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
                // navigate("/login")
            })
            console.log(response)
        }
    }
}

const sendTokenGet = async (query) => {
    const idToken = localStorage.getItem('token')
    try {
        const res = await axios.get(query, {
            headers: {
                Authorization: `Bearer ${idToken}`,
                body: 'Hi, everyone!'
            }
        })
        return res
    } catch (error) {
        errorHandling(error)
    }
}

const sendTokenPost = async (query) => {
    const idToken = localStorage.getItem('token')
    try {
        const res = await axios.post(query, {
            headers: {
                Authorization: `Bearer ${idToken}`,
                body: 'Hi, everyone!'
            }
        })
        return res
    } catch (error) {
        errorHandling(error)
    }
}

export const postNameAndId = async (name) => {
    return sendTokenPost(baseUrl + `/post/name?name=${name}`)
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

export const postMove = async (game_id, src) => {
    try {
        const res = await axios.post(baseUrl + `/post/move/base64?game_id=${game_id}`, { img: src })
        const blob = new Blob([res.data], { type: 'image/png' })
        const url = window.URL || window.webkitURL
        return url.createObjectURL(blob)
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


export const getRateFromId = async () => {
    return sendTokenGet(baseUrl + `/get/rate`)
    // try {
    //     const res = await axios.get(baseUrl + `/get/rate`)
    //     console.log(res)
    //     return res
    // } catch (err) {
    //     console.log("err:", err)
    // }
}

export const getAllRate = async () => {
    return sendTokenGet(baseUrl + `/get/rate`)
    // try {
    //     const res = await axios.get(baseUrl + `/get/rate_hist`)
    //     console.log(res)
    //     return res
    // } catch (err) {
    //     console.log("err:", err)
    // }
}

export const getResult = async () => {
    try {
        const res = await axios.get(baseUrl + `/get/result`)
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

export const getName = async () => {
    try {
        const res = await axios.get(baseUrl + `/get/name`)
        console.log(res)
        return res
    } catch (err) {
        console.log("err:", err)
    }
}

export const getAllName = async () => {
    try {
        const res = await axios.get(baseUrl + `/get/all_name`)
        console.log(res)
        return res
    } catch (err) {
        console.log("err:", err)
    }
}