import {WebSocketServer, WebSocket} from 'ws';

// create a websocket server on port 8080
const wss=new WebSocketServer({port:8080});


console.log('WebSocket server is running on ws://localhost:8080');


wss.on('connection', (ws:WebSocket, request)=>{
    const clientIp=request.socket.remoteAddress ?? 'unknown';
    console.log(`New client connected: ${clientIp}`)
    console.log(`Total connected clients: ${wss.clients.size}`)

    // send a welcome message to the newly connected client
    ws.send(JSON.stringify({type:'welcome', message:'connection established'}))

    
// Listen for messages from this client
ws.on('message',(data:Buffer)=>{

    try{
        // Messages arrive as buffers: parse them as JSON
        const message=JSON.parse(data.toString());
        console.log(`Received: `, message)
        ws.send(JSON.stringify({type:'echo', payload:message}))

    }
    catch(error){
ws.send(JSON.stringify({type:'error', message:'Invalid JSON format'}))
    }
    
})

// The "close" event fires when the client disconnects.
ws.on('close', (code:number, reason:Buffer)=>{
    console.log(`Client disconnected: ${clientIp} (code: ${code}, reason: ${reason.toString()})`)
})

// handle errors on this sockets
ws.on('error', (err:Error)=>{
    console.error(`Socket Error : `, err.message);
})
})


