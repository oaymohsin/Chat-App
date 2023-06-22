const express =require('express');
const { Socket } = require('socket.io');
const package=require('./package.json');
const cors = require('cors');
const { KeyObject } = require('crypto');
const app=express();
const http=require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

app.use(cors({
    origin: '*'
}));


app.use(express.static(__dirname+'/client'))



io.on('connection',(socket)=>{
    console.log('a user connected')
    socket.on('chat message',(message)=>{
        console.log('Received message:',message)
        io.emit('chat message',message)
    })
    socket.on('disconnect',()=>{
        console.log('a user disconnected')
    })
})

const PORT =3000;
http.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
    console.log((package.dependencies))
})