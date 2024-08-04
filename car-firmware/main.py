from picamera2 import Picamera2
from lib.Motor import Motor
from lib.Led import Led
from lib.Servo import Servo
from rpi_ws281x import *
import socketio
import time
import io

socket = socketio.Client()
picam2 = Picamera2()
motor = Motor()
servo = Servo()
led=Led()

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

@socket.on('move_camera')
def on_move_camera(direction):
	if (direction == 'up'):
		servo.up()
	elif (direction == 'down'):
		servo.down()
	elif (direction == 'right'):
		servo.right()
	elif (direction == 'left'):
		servo.left()

@socket.on('led')
def on_led(status):
	print(status)
	if (status == 'on'):
		led.colorWipe(led.strip, Color(255,0, 0))
	else:
		led.colorWipe(led.strip, Color(0,0, 0))


socket.connect('http://192.168.1.222:3000')

socket.wait()