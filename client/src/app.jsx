import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import CameraViewer from "./components/CameraViewer";

const App = () => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const sockectInstance = io('http://localhost:8080');
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
			<CameraViewer />
		</>
	);
}

export default App;