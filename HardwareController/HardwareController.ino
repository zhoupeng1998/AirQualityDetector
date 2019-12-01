#include <map>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <Adafruit_SHT31.h>
#include <ccs811.h>
#include <Adafruit_GPS.h>
#include <SoftwareSerial.h>

#define ONBOARD_LED_PIN 5
#define ANALOG_PIN A0

#define INDOOR_MODE 0
#define OUTDOOR_MODE 1

#define REQUEST_INTERVAL 4000
#define GPSECHO false

const char* WifiSsid = "UCInet Mobile Access";
const char* WifiPsk = "";

SoftwareSerial mySerial(13, 12);

CCS811 ccs(3);
Adafruit_SHT31 sht = Adafruit_SHT31();
Adafruit_GPS GPS(&mySerial);

unsigned long last_request_time;
uint16_t eco2, etvoc, errstat, raw;
int env_mode = 0;
float lon = 0.0, lat = 0.0;

void connectWifi () {
  byte ledStatus = LOW;
  Serial.println();
  Serial.println("Connecting to WiFi...");
  Serial.println("Connecting to: " + String(WifiSsid));
  WiFi.mode(WIFI_STA);
  WiFi.begin(WifiSsid, WifiPsk);
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(5, ledStatus);
    ledStatus = (ledStatus == HIGH) ? LOW : HIGH;
    delay(100);
  }
  digitalWrite(ONBOARD_LED_PIN, HIGH);
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  delay(5000);
  last_request_time = millis();
}

std::map<String, String> getReadings () {
  std::map<String, String> readings;
  ccs.read(&eco2,&etvoc,&errstat,&raw); 
  readings["gas"] = String(analogRead(ANALOG_PIN));
  // CCS data
  if (errstat==CCS811_ERRSTAT_OK) {
    readings["co2"] = String(eco2);
    readings["tvoc"] = String(etvoc);
  }
  // SHT data
  float t = sht.readTemperature();
  float h = sht.readHumidity();
  if (!isnan(t)) {
    readings["temp"] = String(t);
  }
  if (!isnan(h)) {
    readings["humidity"] = String(h);
  }
  // GPS data
  if (GPS.fix) {
    env_mode = OUTDOOR_MODE;
    lat = GPS.latitude;
    if (GPS.lat == 'S') {
      lat *= -1;  
    }
    lon = GPS.longitude;
    if (GPS.lon == 'W') {
      lon *= -1;  
    }
  } else {
    env_mode = INDOOR_MODE;  
  }
  readings["lat"] = String(lat, 4);
  readings["lon"] = String(lon, 4);
  return readings;
}

String prepareQueryString (std::map<String, String>& data) {
  String query = "http://13.57.9.33:8080/portal?mac=" + String(WiFi.macAddress());
  query += "&mode=" + String(env_mode);
  for (auto entry : data) {
    query += "&" + entry.first + "=" + entry.second;
  }
  Serial.println(query);
  return query;
}

void sendGetRequest () {
  WiFiClient client;
  HTTPClient http;
  //Serial.print("[HTTP] begin...\n");
  auto readings = getReadings();
  prepareQueryString(readings);
  
  if (http.begin(client, prepareQueryString(readings))) {
    Serial.print("[HTTP] GET...\n");
    int httpCode = http.GET();
    if (httpCode > 0) {
      Serial.printf("[HTTP] GET... code: %d\n", httpCode);
      if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();
          Serial.println(payload);
      }
    } else {
      Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  } else {
    Serial.printf("[HTTP} Unable to connect\n");
  }
  
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  Serial.println("HARDWARE RESTART");
  // Start CCS811, SHT31
  ccs.set_i2cdelay(50);
  bool beg = ccs.begin();
  bool sta = ccs.start(CCS811_MODE_1SEC);
  if (!beg || !sta) {
    Serial.println("Couldn't find CCS811");  
  }
  sht.begin();
  // Start GPS
  GPS.begin(9600);
  GPS.sendCommand(PMTK_SET_NMEA_OUTPUT_RMCGGA);
  GPS.sendCommand(PMTK_SET_NMEA_UPDATE_1HZ);
  GPS.sendCommand(PGCMD_ANTENNA);
  // Start Pins
  pinMode(ANALOG_PIN, INPUT);
  pinMode(ONBOARD_LED_PIN, OUTPUT);
  digitalWrite(ONBOARD_LED_PIN,LOW);
}

void loop() {
  char c = GPS.read();
  if ((c) && (GPSECHO))
    Serial.write(c);
  if (GPS.newNMEAreceived()) {
    if (!GPS.parse(GPS.lastNMEA()))
      return;
  }
  if (millis() - last_request_time >= REQUEST_INTERVAL) {
    digitalWrite(ONBOARD_LED_PIN, LOW);
    if (WiFi.status() != WL_CONNECTED) {
      Serial.print("Wifi disconnected! Connecting...");
      Serial.println(millis());
      connectWifi();
    } else {
      Serial.print("Wifi connected at ");
      Serial.print(WiFi.localIP());
      Serial.print(" time ");
      Serial.println(millis());
      sendGetRequest();
    }
    digitalWrite(ONBOARD_LED_PIN, LOW);
    last_request_time = millis();
  }
  //delay(100);
}
