import axios from 'axios'

let api = axios.create({

    // baseURL:"http://localhost:4000"
    baseURL:`https://5352-139-228-111-126.ngrok-free.app`
})

export default api