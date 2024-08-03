import { useEffect } from 'react';
import PropTypes from 'prop-types';

const CarController = ({ socket }) => {

	useEffect(() => {
		const handleKeyDown = (event) => {
			switch (event.key) {

				case 'w':
					socket.emit('move_camera', 'up');
					console.log('Camera up');
					break;
				case 's':
					socket.emit('move_camera', 'down');
					console.log('Camera down');
					break;
				case 'a':
					socket.emit('move_camera', 'left');
					console.log('Camera left');
					break;
				case 'd':
					socket.emit('move_camera', 'right');
					console.log('Camera right');
					break;

				case 'ArrowUp':
					socket.emit('move', 'forward');
					console.log('Avancer');
					break;
				case 'ArrowDown':
					socket.emit('move', 'backward');
					console.log('Reculer');
					break;
				case 'ArrowLeft':
					socket.emit('move', 'left');
					console.log('Tourner à gauche');
					break;
				case 'ArrowRight':
					socket.emit('move', 'right');
					console.log('Tourner à droite');
					break;

				case 'Enter':
					socket.emit('led', 'on');
					console.log('Allumer la LED');
					break;
				default:
					break;
			}
		};

		const handleKeyUp = (event) => {
			switch (event.key) {
				case 'w':
					socket.emit('move_camera', 'stop');
					break;
				case 's':
					socket.emit('move_camera', 'stop');
					break;
				case 'a':
					socket.emit('move_camera', 'stop');
					break;
				case 'd':
					socket.emit('move_camera', 'stop');
					break;

				case 'ArrowUp':
					socket.emit('move', 'stop');
					break;
				case 'ArrowDown':
					socket.emit('move', 'stop');
					break;
				case 'ArrowLeft':
					socket.emit('move', 'stop');
					break;
				case 'ArrowRight':
					socket.emit('move', 'stop');
					break;
				case 'Enter':
					socket.emit('led', 'off');
					break;
				default:
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	return (
		<div>
			<h2>Utilisez les touches fléchées pour contrôler la voiture</h2>
		</div>
	);
}

CarController.propTypes = {
	socket: PropTypes.object.isRequired,
};


export default CarController;
