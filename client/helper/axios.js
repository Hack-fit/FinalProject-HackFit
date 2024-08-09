import axios from 'axios'

let api = axios.create({
    baseURL:"https://d8af-139-228-111-126.ngrok-free.app" // <== ganti url disini
})

export default api