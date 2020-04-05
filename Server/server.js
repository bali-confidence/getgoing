const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');



const PORT = 3000
const api = require('./routes/api')
const app = express()
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

app.use(cors())

app.use(bodyParser.json({limit: '50mb'})) 
app.use(bodyParser.urlencoded({ limit: '50mb', "extended": false }))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../LetsGoApp/dist/LetsGoApp')))
app.use('/', express.static(path.join(__dirname, '../LetsGoApp/dist/LetsGoApp')))
app.use('/api', api)
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../LetsGoApp/dist/LetsGoApp/index.html'));
})



const port = process.env.PORT || PORT
app.set('port', port)
// const server = http.createServer(app)

// server.listen(port, () => {
//     console.log(`started on the new port ${port}`);
// });

// var server = 

// const socket = io(server);
io.on("connection", (socket) => {
    // Log whenever a user connects
    console.log("user connected");
  
    // Log whenever a client disconnects from our websocket server
    socket.on("disconnect", function() {
      console.log("user disconnected");
    });
  
    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    // socket.on("message", message => {
    //   console.log("Message Received: " + message);
    //   io.emit("message", { type: "new-message", text: message });
    // });
  });

  server.listen(PORT, () => console.log(`Server has started. ${PORT}`));