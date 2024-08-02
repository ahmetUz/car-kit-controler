import { useEffect } from 'react';
import PropTypes from 'prop-types';

CarController.propTypes = {
	socket: PropTypes.object.isRequired,
};

const CarController = ({ socket }) => {

	useEffect(() => {
		const handleKeyDown = (event) => {
			switch (event.key) {
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
				default:
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div>
			<h2>Utilisez les touches fléchées pour contrôler la voiture</h2>
		</div>
	);
}

export default CarController;
