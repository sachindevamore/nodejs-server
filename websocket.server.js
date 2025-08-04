const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  // Send a message to the client
  socket.send(JSON.stringify({ type: 'welcome', content: 'Hello Client!' }));

  // Listen for messages from the client
  socket.on('message', (message) => {
    console.log('Received from client:', message);
  });

  // Handle client disconnection
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');