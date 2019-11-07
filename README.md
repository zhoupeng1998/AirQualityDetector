# AirQualityDetector
The IoT Project connecting Sparkfun ESP8266 Thing Dev Board, Web Server, and User Applications

## Getting Started
### Prerequisites
#### Arduino
- [Arduino](https://www.arduino.cc/en/Main/Software)
- [ESP8266 Thing Library for Arduino](https://learn.sparkfun.com/tutorials/esp8266-thing-hookup-guide/installing-the-esp8266-arduino-addon)
- [CCS811 Library for Arduino](https://learn.adafruit.com/adafruit-ccs811-air-quality-sensor/arduino-wiring-test)
- [SHT31-D Library for Arduino](https://learn.adafruit.com/adafruit-sht31-d-temperature-and-humidity-sensor-breakout/wiring-and-test)
- [Adafruit GPS Library for Arduino](https://learn.adafruit.com/adafruit-ultimate-gps/arduino-wiring)
#### Web Server
- [Node.js](https://nodejs.org/en/)
- pm2 ` npm install -g pm2 `
### Starting the Server
``` 
cd server
npm install
npm run deploy
```
