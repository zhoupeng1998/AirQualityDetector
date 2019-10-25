#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

#define ONBOARD_LED_PIN 5
#define REQUEST_INTERVAL 10000

const char* WifiSsid = "UCInet Mobile Access";
const char* WifiPsk = "";

//const char* WifiSsid = "ZP-iPhone7";
//const char* WifiPsk = "zpwobaba";

ESP8266WiFiMulti WiFiMulti;
unsigned long last_request_time;

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

void sendGetRequest () {
  WiFiClient client;
  HTTPClient http;
  Serial.print("[HTTP] begin...\n");
  if (http.begin(client, "http://192.168.1.72:8080/portal")) {
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
  pinMode(ONBOARD_LED_PIN, OUTPUT);
  digitalWrite(ONBOARD_LED_PIN,LOW);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.print("Wifi disconnected! Connecting...");
    Serial.println(millis());
    connectWifi();
  } else {
    Serial.print("Wifi connected at ");
    Serial.print(WiFi.localIP());
    Serial.print(" time ");
    Serial.println(millis());
    digitalWrite(ONBOARD_LED_PIN, HIGH);
    if (millis() - last_request_time >= REQUEST_INTERVAL) {
      digitalWrite(ONBOARD_LED_PIN, LOW);
      sendGetRequest();
      last_request_time = millis();
      delay(1000);
      digitalWrite(ONBOARD_LED_PIN, HIGH);
    }
  }
  delay(1000);
}
