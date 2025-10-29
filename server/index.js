import { WebSocketServer } from 'ws';

const PORT = 7500
const wss = new WebSocketServer({ port: PORT });
console.log(`Le serveur WebSocket est en cours d'exécution sur ws://localhost :${PORT}`);

wss.on('connection', (ws) => {
  console.log('Nouveau client connecté');

  ws.on('message', (message) => {
    console.log(`message reçu: ${message.toString()}`);

    // Diffuser le message à tous les clients
    wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
              client.send(message.toString());
            }
    });
  });
  ws.on('close', () => {
    console.log('Client déconnecté');
  })

})
