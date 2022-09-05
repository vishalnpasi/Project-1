const myexpress = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-Parser')
const router = require('../router/router.js')
const app = myexpress()

app.use(bodyParser.json())

mongoose.connect('',{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/',router)

app.listen(process.env.PORT  || 3000, function(){ 
    console.log("Express is Running in Port:",process.env.PORT || 3000 )
})