from lib.PCA9685 import PCA9685


class Servo:
	def __init__(self):
		self.PwmServo = PCA9685(0x40, debug=True)
		self.PwmServo.setPWMFreq(50)
		self.PwmServo.setServoPulse(8, 1500)
		self.PwmServo.setServoPulse(9, 1500)
		self.servo0 = 90
		self.servo1 = 90

	def setServoPwm(self, channel, angle, error=10):
		angle = int(angle)
		if channel == '0':
			self.PwmServo.setServoPulse(8, 2500 - int((angle + error) / 0.09))
		elif channel == '1':
			self.PwmServo.setServoPulse(9, 500 + int((angle + error) / 0.09))
		elif channel == '2':
			self.PwmServo.setServoPulse(10, 500 + int((angle + error) / 0.09))
		elif channel == '3':
			self.PwmServo.setServoPulse(11, 500 + int((angle + error) / 0.09))
		elif channel == '4':
			self.PwmServo.setServoPulse(12, 500 + int((angle + error) / 0.09))
		elif channel == '5':
			self.PwmServo.setServoPulse(13, 500 + int((angle + error) / 0.09))
		elif channel == '6':
			self.PwmServo.setServoPulse(14, 500 + int((angle + error) / 0.09))
		elif channel == '7':
			self.PwmServo.setServoPulse(15, 500 + int((angle + error) / 0.09))

	def up(self):
		self.servo0 -= 5
		self.setServoPwm('1', self.servo0)

	def down(self):
		self.servo0 += 5
		self.setServoPwm('1', self.servo0)

	def right(self):
		self.servo1 += 5
		self.setServoPwm('0', self.servo1)

	def left(self):
		self.servo1 -= 5
		self.setServoPwm('0', self.servo1)
