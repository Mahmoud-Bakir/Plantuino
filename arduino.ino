#include <Ethernet.h>
#include <ArduinoJson.h>
#include <Servo.h>

#define motor_Pin 5

EthernetServer server(80);

int soil_moisture_pin = A5;
int ldr_pin = A4;
int lightPin = 7;
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

EthernetClient client;
StaticJsonDocument<200> doc;
Servo myServo;
int moisture_percentage; 

void readSoilMoisture() {
  int soil_moisture_value = analogRead(soil_moisture_pin);
  moisture_percentage = map(soil_moisture_value, 700, 0, 0, 100); 
  doc["moisture_value"] = moisture_percentage;
}

void readLdr() {
  int light_value = analogRead(ldr_pin);
  int light_percentage = map(light_value, 800, 20, 100, 0);
  doc["ldr_value"] = light_percentage;
}

void sendData(String data, IPAddress server_ip) {
  if (client.connect(server_ip, 3000)) {
    client.println("POST /arduino/sendData HTTP/1.1");
    client.println("Host: " + String(server_ip));
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(data.length());
    client.println();
    client.println(data);
  } else {
    Serial.println("Connection failed");
  }
  client.stop();
}


void setup() {
  pinMode(lightPin, OUTPUT);
  Serial.begin(9600);
  Ethernet.begin(mac);
}

void loop() {
  delay(3600000 );
  readSoilMoisture();
  readLdr();
  String json_data;
  serializeJson(doc, json_data);
  Serial.println(json_data);
  IPAddress serverIp(192, 168, 1, 5);

  if (moisture_percentage < 50) {
    digitalWrite(lightPin, HIGH);
  } else {
    digitalWrite(lightPin, LOW);
  }
  sendData(json_data, serverIp);
  EthernetClient client = server.available();
}
