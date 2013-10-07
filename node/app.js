var
serialport = require('serialport'),
express = require('express'),
stylus = require('stylus'),
nib = require('nib');

// App
var app = express();
app.configure(function() {
	app.use(stylus.middleware({
			src: __dirname + '/views',
			dest: __dirname + '/app',
			compile: compile,
			force: true
		})
	);
	app.use(express.static(__dirname + '/app'));
});
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Stylus
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

// Serial
var SerialPort = serialport.SerialPort;

var serialPort = new SerialPort("/dev/tty.usbmodem1421", {
	baudrate: 9600,
	parser: serialport.parsers.readline("\n")
});

serialData = [];

serialPort.on('open', function () {
	serialPort.on('data', function(data) {
		console.log('data: ' + data);
		serialData.unshift(data);
	});
});

// Routes
app.get('/', function (req, res) {
	res.render('index', {
		title : 'Home'
	});
});	

app.put('/dish/:dish', function (req, res) {
	var dish = req.params.dish;
	if (dish < 0 || dish > 3) return;

	serialPort.write(req.params.dish+'\n');

	setTimeout(function() {
		var data;
		while (serialData.length)
			data = serialData.pop();
		res.send(data);	
	}, 1500);
});

app.listen(3000);