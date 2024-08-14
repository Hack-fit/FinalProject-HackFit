if(process.env.NODE_ENV !== "production"){
  require("dotenv").config()
}

const express = require("express")
const UserController = require("./Controller/UserController")
const authentication = require("./middleware/authentication")
const BookingController = require("./Controller/BookingController")
const TrainerController = require("./Controller/TrainerController")
const TrainingController = require("./Controller/TrainingController")
// var cors = require('cors')
const app = express()
const port = 4000

// app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
 
app.get('/', (req, res,next) => {
  res.send('successfully connected')
})

app.get('/user',UserController.getall)
app.get('/trainer',UserController.getAllTrainers)

app.post('/register',UserController.register)
app.post('/register-pt',UserController.registerPt)
app.post('/login',UserController.login)
app.post(`/notification-payment`, BookingController.notification)


app.use(authentication)// authentication setelah login, belum handle di client. manual buat headersnya 

app.post(`/midtrans`, BookingController.midtrans)
app.get('/trainers',TrainerController.getalltrainer)
app.post('/openai',UserController.openAi)
app.get('/profile',UserController.finduserbyId)
app.put('/update-user',UserController.updateuser)

app.get('/trainer-detail/:id',TrainerController.getptbyid)

app.get('/get-training',TrainingController.getTraining)
app.delete('/delete-user',UserController.deleteUser)
app.get('/get-todo',TrainingController.getTodo)




app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

module.exports = app
