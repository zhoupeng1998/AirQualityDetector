#include <map>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <Adafruit_CCS811.h>
#include <Adafruit_SHT31.h>

#define ONBOARD_LED_PIN 5
#define ANALOG_PIN A0
#define OUTDOOR_BUTTON_PIN 12
#define INDOOR_BUTTON_PIN 13
#define REQUEST_INTERVAL 10000

const char* WifiSsid = "UCInet Mobile Access";
const char* WifiPsk = "";

//const char* WifiSsid = "ZP-iPhone7";
//const char* WifiPsk = "zpwobaba";

Adafruit_CCS811 ccs;
Adafruit_SHT31 sht = Adafruit_SHT31();

unsigned long last_request_time;
int env_mode = 0;

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
  readings["gas"] = String(analogRead(ANALOG_PIN));
  if (ccs.available()) {
    readings["co2"] = String(ccs.geteCO2());
    readings["tvoc"] = String(ccs.getTVOC());
  }
  float t = sht.readTemperature();
  float h = sht.readHumidity();
  if (!isnan(t)) {
    readings["temp"] = String(t);
  }
  if (!isnan(h)) {
    readings["humidity"] = String(h);
  }
  return readings;
}

String prepareQueryString (std::map<String, String>& data) {
  String query = "http://192.168.1.72:8080/portal?mac=" + String(WiFi.macAddress());
  query += "&mode=" + String(env_mode);
  for (auto entry : data) {
    query += "&" + entry.first + "=" + entry.second;
  }
  return query;
}

void sendGetRequest () {
  WiFiClient client;
  HTTPClient http;
  Serial.print("[HTTP] begin...\n");
  auto readings = getReadings();
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
  ccs.begin();
  sht.begin();
  pinMode(ANALOG_PIN, INPUT);
  pinMode(OUTDOOR_BUTTON_PIN, INPUT);
  pinMode(INDOOR_BUTTON_PIN, INPUT);
  pinMode(ONBOARD_LED_PIN, OUTPUT);
  digitalWrite(ONBOARD_LED_PIN,LOW);
}

void loop() {
  if (digitalRead(INDOOR_BUTTON_PIN) == HIGH) {
    env_mode = 0;  
  }
  if (digitalRead(OUTDOOR_BUTTON_PIN) == HIGH) {
    env_mode = 1;  
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
}
