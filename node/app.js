console.log("boots");

var SerialPort = require("serialport").SerialPort;
console.log("1=============");
console.log(SerialPort);
var serialPort = new SerialPort("/dev/tty.Bluetooth-Modem", {
  baudrate: 9600
});