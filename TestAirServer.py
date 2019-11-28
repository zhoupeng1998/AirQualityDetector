import time
import requests
import random

def make_paras () :
    adict = dict()
    adict['mac'] = macs[random.randint(0,5)]
    adict['gas'] = str(round(random.random() * random.randint(1,100), 3))
    adict['co2'] = str(round(random.random() * random.randint(1,100), 3))
    adict['tvoc'] = str(round(random.random() * random.randint(1,100), 3))
    adict['temp'] = str(round(random.random() * random.randint(1,100), 3))
    adict['humidity'] = str(round(random.random() * random.randint(1,100), 3))
    adict['lon'] = str(round(random.random() * -random.randint(1,100), 4))
    adict['lat'] = str(round(random.random() * random.randint(1,100), 4))
    return adict

macs = ["1A:2B:3C:4D:5E:6F", "12:34:56:78:90:AB", "AA:BB:CC:DD:EE:FF", "6A:5B:4C:3D:2E:1F", "FF:EE:DD:CC:BB:AA", "FE:98:76:54:32:10"]

print(round(random.random() * random.randint(1,100), 3))

for i in range(100):
    response = requests.get("http://13.57.9.33:8080/portal?", params=make_paras())
    print(i, response)
    time.sleep(10)
