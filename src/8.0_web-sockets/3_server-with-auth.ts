// 3.4 Attaching Custom Metadata to Sockets
// The base WebSocket class has no built-in "metadata" field, so you need to extend it.
// TypeScript makes this clean with module augmentation or a typed wrapper.

import {WebSocketServer} from 'ws';

import { AuthenticatedSockets } from './types/types';
import { request } from 'node:http';

const wss=new WebSocketServer({port:8080});

wss.on('connection', (ws, request)=>{
    const socket=ws as AuthenticatedSockets; // Type assertion to our extended type
    // parse query string to get token (simplified;)

    const url=new URL(request.url ?? '/', 'http://localhost');
    const token=url.searchParams.get('token');
    // Attaach metadata directly to the socket object
    socket.userId=token ?? 'anonymous';
    socket.username='User_' + Math.random().toString(36).slice(2, 7)
    socket.isAlive=true;
    console.log(`User ${socket.username} (${socket.userId}) connected`);

    ws.on('message', (data)=>{
        // we can now refactor socket.userId and socket.username safely
        console.log(`Received from ${socket.username}: `, data.toString())
    })
})