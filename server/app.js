const express = require("express")
const UserController = require("./Controller/UserController")
const app = express()
const port = 4000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
 
app.get('/user',UserController.getall)
app.post('/register',UserController.register)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

module.exports = app
