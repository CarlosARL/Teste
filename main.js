var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('page.html');

var { SerialPort, ReadlineParser } = require('serialport')

const parser = new ReadlineParser({
  delimiter: '\r\n'
});
var port = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
})

port.pipe(parser);

var app = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(index);
});

var io = require('socket.io').listen(app);

io.on('connection', function (app) {

  console.log('Node is listening to port');

});

parser.on('data', function (data) {

  console.log('Received data from port: ' + data);
  io.emit('data', data);

});

app.listen(3000);