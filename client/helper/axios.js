import axios from 'axios'

let api = axios.create({

    // baseURL:"http://localhost:4000"

    baseURL:`https://ba94-104-28-245-130.ngrok-free.app`


})

export default api