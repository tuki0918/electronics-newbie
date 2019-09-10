import RPi.GPIO as GPIO
import time
from picamera import PiCamera

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(25, GPIO.IN)

try:
    cnt = 1
    camera = PiCamera()
    camera.resolution = (320, 240)
    while True:
        if GPIO.input(25):
            pass
        else:
            camera.capture('hoge_' + str(cnt) + '.jpg')
            cnt += 1
except KeyboardInterrupt:
    pass

GPIO.cleanup()
