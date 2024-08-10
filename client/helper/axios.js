import axios from 'axios'

let api = axios.create({

    // baseURL:"http://localhost:4000"
    baseURL:`https://3526-118-99-81-132.ngrok-free.app`
})

export default api