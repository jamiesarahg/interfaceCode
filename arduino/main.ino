#include <Servo.h>

// Servo variables
Servo servo;
int servoPin = 9;
int pos = 0;
// Sensor variables
int sensorPin = A0;
// Set values
int dishAngle[] = {0,30,60,90};
// LEDS
int leds[] = {13,12,11,10};

float rawRange = 1024; // 3.3v
float logRange = 5.0; // 3.3v = 10^5 lux

float processedLux() {
	return rawToLux(analogRead(sensorPin));
}

float rawToLux(int raw)
{
	float logLux = raw * logRange / rawRange;
	return pow(10, logLux);
}

void setup()
{
	analogReference(EXTERNAL);
	Serial.begin(9600);

	servo.attach(servoPin);

	for (int i=0; i<4; i++) {
		pinMode(leds[i], OUTPUT); 
	}
}

float averagedRange(int count) {
  float total = 0;

  for (int i = 0; i < count; i ++) {
    float sensorValue = processedLux();
    total += sensorValue;

    delay(2);
  }

  return total/count;
}

float observeDish(int dishNum) {
	digitalWrite(leds[dishNum], HIGH); 
	servo.write(dishAngle[dishNum]);
	delay(15);
	float opacity= averagedRange(20);
	Serial.print(dishNum);
	Serial.print("=");
	Serial.println(opacity);
	digitalWrite(leds[dishNum], LOW); 

}

void loop() {

//	if (Serial.available() > 0) {
//		char incomingByte = Serial.read();

	//	Serial.print("I received: ");
	//	Serial.println(incomingByte);
	
	//	observeDish(incomingByte);	
	//}

	for (int i=0; i<4; i++) {	//for testing w/out serial
		int incomingByte=i;
		observeDish(incomingByte);
	}
	
}