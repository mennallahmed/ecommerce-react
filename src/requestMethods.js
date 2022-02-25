import axios from "axios";


const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmFjNjQzNjkxMDIzYTEwMzY5OWY4MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTc5NTMxMCwiZXhwIjoxNjQ2MDU0NTEwfQ.68DoVM_PuIl9kIiQGMLqJeCyIVPBEXdCnY3DVSfuh6Q"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header:{token: `Bearer ${TOKEN}`}
})