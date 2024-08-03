import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CameraViewer = ({ socket }) => {
	const [image, setImage] = useState(null);

	useEffect(() => {
		socket.on('camera_stream', (data) => {
			const arrayBufferView = new Uint8Array(data);
			const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
			const urlCreator = window.URL || window.webkitURL;
			const imageUrl = urlCreator.createObjectURL(blob);
			setImage(imageUrl);
		});

		return () => {
			socket.off('camera_stream');
		};
	});

	return (
		<div>
			<h1>Camera Viewer</h1>
			{image && <img src={image} alt="Live Camera Feed" />}
		</div>
	);
};

CameraViewer.propTypes = {
	socket: PropTypes.object.isRequired,
};

export default CameraViewer;