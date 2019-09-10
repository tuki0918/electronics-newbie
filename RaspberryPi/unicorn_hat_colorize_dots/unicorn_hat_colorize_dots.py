import time
import unicornhathd
from random import randint

width, height = unicornhathd.get_shape() 
unicornhathd.brightness(1.0)

try:
    for x in range(width):
        for y in range(height):
            r, g, b = randint(0, 255), randint(0, 255), randint(0, 255)
            unicornhathd.set_pixel(x, y, r, g, b)
            unicornhathd.show()
            time.sleep(0.1)
    time.sleep(5)
    unicornhathd.off()
except KeyboardInterrupt:
    unicornhathd.off()
