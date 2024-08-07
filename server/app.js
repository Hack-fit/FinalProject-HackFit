if(process.env.NODE_ENV !== "production"){
  require("dotenv").config()
}

const express = require("express")
const UserController = require("./Controller/UserController")
const authentication = require("./middleware/authentication")
// var cors = require('cors')
const app = express()
const port = 4000

// app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
 

app.get('/user',UserController.getall)
app.post('/register',UserController.register)
app.post('/register-pt',UserController.registerPt)
app.post('/login',UserController.login)

app.use(authentication)// authentication setelah login, belum handle di client. manual buat headersnya 

app.post('/openai',UserController.openAi)
app.get('/profile',UserController.finduserbyId)


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

module.exports = app
