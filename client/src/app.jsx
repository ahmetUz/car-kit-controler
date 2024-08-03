import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import CameraViewer from "./components/CameraViewer";
import CarController from "./components/CarController";

const App = () => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const sockectInstance = io('http://localhost:3000');
		setSocket(sockectInstance);
		return () => {
			(sockectInstance.disconnect);
		};
	}, []);

	useEffect(() => {
		if (!socket) return;

		socket.on('identify', (message) => {
			console.log(message);
			socket.emit('identify', 'client');
		});

		return () => {
			socket.off('identify');
		};
	})

	return (
		<>
			{socket && <CameraViewer socket={socket} /> }
			{socket && <CarController socket={socket} />}
		</>
	);
}

export default App;