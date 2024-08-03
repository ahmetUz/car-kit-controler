import socketio
from lib.Motor import Motor
from picamera2 import Picamera2
import time
import io

socket = socketio.Client()
motor = Motor()
picam2 = Picamera2()

def stream_camera():
	while True:
		stream = io.BytesIO()
		picam2.capture_file(stream, format="jpeg")
		stream.seek(0)
		image_data = stream.read()
		socket.emit('camera_stream', image_data)
		time.sleep(0.1)

@socket.event
def connect():
	print("Connextion au serveur")
	socket.emit('identify', 'car')
	picam2.start()
	stream_camera()

@socket.on('move')
def on_move(direction):
	if (direction == 'forward'):
		motor.forward()
	elif (direction == 'backward'):
		motor.backward()
	elif (direction == 'left'):
		motor.left()
	elif (direction == 'right'):
		motor.right()
	else:
		motor.stop()
		

socket.connect('http://')

socket.wait()