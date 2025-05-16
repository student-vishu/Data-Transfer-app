require('dotenv').config()
const http = require('http')
const express = require('express')
const path = require('path')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 8000
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'

app.use(cors({
    origin: CORS_ORIGIN
}))

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: CORS_ORIGIN
    }
})

//socketIo
let latestdata = null

io.on('connection', (socket) => {
    if (latestdata) {
        socket.emit('display-data', latestdata)
    }

    socket.on('formData', (data) => {
        // console.log(data);
        latestdata = data
        io.emit('display-data', data)
    })

})

// app.get('/',(req,res)=>{
//     // res.sendFile()
// })
server.listen(PORT, () => { console.log(`Server is running on PORT:${PORT}`); })