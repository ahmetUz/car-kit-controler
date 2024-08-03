const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

app.use(cors({
	origin: '*',
}));

const sockets = new Map();

io.on('connection', (socket) => {
	console.log('Un utilisateur est connecté');

	socket.emit('identify', 'Veuillez vous identifier: client ou voiture?');

	socket.on('identify', (role) => {
		if (role === 'client') {
			console.log('Un client est identifié');
			sockets.set('client', socket);
		} else if (role === 'car') {
			console.log('Une voiture est identifiée');
			sockets.set('car', socket);
		} else {
			socket.emit('error', 'Identification invalide');
		}
	});

	socket.on('camera_stream', (data) => {
		const clientSocket = sockets.get('client');
		if (clientSocket) {
			clientSocket.emit('camera_stream', data);
		}
	})

	socket.on('move', (direction) => {
		console.log(`La voiture se déplace vers ${direction}`);
		const carSocket = sockets.get('car');
		if (carSocket) {
			carSocket.emit('move', direction);
		}
	});

	socket.on('move_camera', (direction) => {
		console.log(`La caméra se déplace vers ${direction}`);
		const carSocket = sockets.get('car');
		if (carSocket) {
			carSocket.emit('move_camera', direction);
		}
	});

	socket.on('led', (state) => {
		console.log(`La LED est ${state}`);
		const carSocket = sockets.get('car');
		if (carSocket) {
			carSocket.emit('led', state);
		}
	});

	socket.on('disconnect', () => {
		console.log('Un utilisateur s\'est déconnecté');
	});
});

server.listen(3000, () => {
	console.log('Serveur en écoute sur http://localhost:3000');
});
