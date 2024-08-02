const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const sockets = new Map();

io.on('connection', (socket) => {
	console.log('Un utilisateur est connecté');

	socket.emit('identify', 'Veuillez vous identifier: client ou voiture?');

	socket.on('identify', (role) => {
		if (role === 'client') {
			console.log('Un client est identifié');
			sockets.set('client', socket);
		} else if (role === 'voiture') {
			console.log('Une voiture est identifiée');
			sockets.set('voiture', socket);
		} else {
			socket.emit('error', 'Identification invalide');
		}
	});

	socket.on('disconnect', () => {
		console.log('Un utilisateur s\'est déconnecté');
	});
});

server.listen(3000, () => {
	console.log('Serveur en écoute sur http://localhost:3000');
});
