#include <Servo.h>

// Servo variables
Servo servo;
int servoPin = 9;
int pos = 0;
int dishAngle[] = {10,30,40,60};
int dishLED[] = {1,2,3,4};
// Sensor variables
int sensorPin = A0;

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
	servo.write(dishAngle[dishNum]);
	float opacity= averagedRange(20);
	Serial.print(dishNum);
	Serial.print("=");
	Serial.println(opacity);

}

void loop() {

//	if (Serial.available() > 0) {
//		char incomingByte = Serial.read();

	//	Serial.print("I received: ");
	//	Serial.println(incomingByte);
		
	//}
	for (int i=0; i<4; i++) {
		int incomingByte=i;
		observeDish(incomingByte);
	}
	
}