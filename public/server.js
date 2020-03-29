const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')

const cookieParser = require('cookie-parser') 
const path = require('path')

const PORT = 3000
const api = require('./routes/api')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(bodyParser.json({limit: '50mb'})) 
app.use(bodyParser.urlencoded({ limit: '50mb', "extended": false }))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', api)
// app.use('/', function(req, res){
//     res.send('Hellow from Server')
// })


const port = process.env.PORT || '8080'
app.set('port', port)
const server = http.createServer(app)

server.listen(port, function(){
    console.log('server running on localhost:' + PORT)
})