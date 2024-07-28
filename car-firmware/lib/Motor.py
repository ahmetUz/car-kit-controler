import math
from PCA9685 import PCA9685
from ADC import *
import time

class Motor:
	def __init__(self):
		self.pwm = PCA9685(0x40, debug=True)
		self.pwm.setPWMFreq(50)
		self.time_propotion = 2.5
		self.adc = ADC()
	
	@staticmethod
	def duty_range(duty1, duty2, duty3, duty4):
		if duty1 > 4095:
			duty1 = 4095
		elif duty1 < -4095:
			duty1 = -4095

		if duty2 > 4095:
			duty2 = 4095
		elif duty2 < -4095:
			duty2 = -4095

		if duty3 > 4095:
			duty3 = 4095
		elif duty3 < -4095:
			duty3 = -4095

		if duty4 > 4095:
			duty4 = 4095
		elif duty4 < -4095:
			duty4 = -4095
		return duty1, duty2, duty3, duty4
	
	def left_Upper_Wheel(self, duty):
		if duty > 0:
			self.pwm.setMotorPwm(0, 0)
			self.pwm.setMotorPwm(1, duty)
		elif duty < 0:
			self.pwm.setMotorPwm(1, 0)
			self.pwm.setMotorPwm(0, abs(duty))
		else:
			self.pwm.setMotorPwm(0, 4095)
			self.pwm.setMotorPwm(1, 4095)

	def left_Lower_Wheel(self, duty):
		if duty > 0:
			self.pwm.setMotorPwm(3, 0)
			self.pwm.setMotorPwm(2, duty)
		elif duty < 0:
			self.pwm.setMotorPwm(2, 0)
			self.pwm.setMotorPwm(3, abs(duty))
		else:
			self.pwm.setMotorPwm(2, 4095)
			self.pwm.setMotorPwm(3, 4095)

	def right_Upper_Wheel(self, duty):
		if duty > 0:
			self.pwm.setMotorPwm(6, 0)
			self.pwm.setMotorPwm(7, duty)
		elif duty < 0:
			self.pwm.setMotorPwm(7, 0)
			self.pwm.setMotorPwm(6, abs(duty))
		else:
			self.pwm.setMotorPwm(6, 4095)
			self.pwm.setMotorPwm(7, 4095)

	def right_Lower_Wheel(self, duty):
		if duty > 0:
			self.pwm.setMotorPwm(4, 0)
			self.pwm.setMotorPwm(5, duty)
		elif duty < 0:
			self.pwm.setMotorPwm(5, 0)
			self.pwm.setMotorPwm(4, abs(duty))
		else:
			self.pwm.setMotorPwm(4, 4095)
			self.pwm.setMotorPwm(5, 4095)

	def setMotorModel(self, duty1, duty2, duty3, duty4):
		duty1, duty2, duty3, duty4 = self.duty_range(duty1, duty2, duty3, duty4)
		self.left_Upper_Wheel(duty1)
		self.left_Lower_Wheel(duty2)
		self.right_Upper_Wheel(duty3)
		self.right_Lower_Wheel(duty4)

	def Rotate(self, n):
		angle = n
		bat_compensate = 7.5 / (self.adc.recvADC(2) * 3)
		while True:
			W = 2000

			VY = int(2000 * math.cos(math.radians(angle)))
			VX = -int(2000 * math.sin(math.radians(angle)))

			FR = VY - VX + W
			FL = VY + VX - W
			BL = VY - VX - W
			BR = VY + VX + W

			PWM.setMotorModel(FL, BL, FR, BR)
			print("rotating")
			time.sleep(5 * self.time_proportion * bat_compensate / 1000)
			angle -= 5
	
	def Forward(self):
		self.setMotorModel(2000, 2000, 2000, 2000)
	
	def Backward(self):
		self.setMotorModel(-2000, -2000, -2000, -2000)
	
	def TurnLeft(self):
		self.setMotorModel(-500, -500, 2000, 2000)

	def TurnRight(self):
		self.setMotorModel(2000, 2000, -500, -500)
	
	def Stop(self):
		self.setMotorModel(0, 0, 0, 0)
