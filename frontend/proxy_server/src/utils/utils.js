import axios from "axios"

const baseUrl = "http://localhost:8000"

export const getNameFromId = async (user_id) => {
  const data = {"user_id": user_id}
  return axios.post(baseUrl + "/post/name")
  .then((res) => {
    return res
  })
  .catch(err => {
    console.log("err:", err)
  })
}

