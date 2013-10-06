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

serialPort.on('open', function () {
	serialPort.on('data', function(data) {
		console.log('data: ' + data);
	});
});

// Routes
app.get('/', function (req, res) {
	console.log('home!');
	res.render('index', {
		title : 'Home'
	});
});

app.get('/dish/:dish', function (req, res) {
	console.log(req.params.dish);
	serialPort.write(req.params.dish+'\n', function(err, results) {
		console.log('err: ' + err);
		console.log('results: ' + results);
	});
	res.send('Serial!');
});

app.listen(process.env.PORT || 5000);