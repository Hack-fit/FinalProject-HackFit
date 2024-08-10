import axios from 'axios'

let api = axios.create({

    // baseURL:"http://localhost:4000"
    baseURL:`https://5f1d-2404-c0-5c40-00-a6-5f56.ngrok-free.app`
})

export default api