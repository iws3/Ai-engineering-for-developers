// A crucial production concern: if a client disconnects abnormally (network drop, phone goes to
// sleep, etc.), the server may not get a close event for many minutes. You need a heartbeat
// mechanism to detect and clean up dead connections.

import {WebSocketServer, WebSocket} from 'ws';

import { AuthenticatedSockets } from './types/types';

const wss=new WebSocketServer({port:8080});

function heartbeat(this:AuthenticatedSockets) {
// called when a pong is received - client is still alive.
this.isAlive=true;

}


wss.on('connection', (ws)=>{
    const socket=ws as AuthenticatedSockets;
    socket.isAlive=true;
    // Bind the heartbeat function to the 'pong' event
    // bind the heartbeat handler to THIS specific socket.
    socket.on('pong', heartbeat.bind(socket))
})

// After 30 seconds , ping all clients..
// if they do not respond with a pong, terminate them

const interval=setInterval(()=>{
    wss.clients.forEach((ws)=>{
        const socket=ws as AuthenticatedSockets;
        if(!socket.isAlive){
            // cli=ent did not respond to the last ping - it is dead
            console.log('Terminating dead socket');
            return socket.terminate();
        }
        // Mark as not-alive, then send a ping
        // if the client is alive, the pong handler will flip it back to true
        socket.isAlive=false;
        socket.ping()
    })
}, 30_000)

// clean up the interval when the server closes
wss.on('close', ()=>clearInterval(interval))