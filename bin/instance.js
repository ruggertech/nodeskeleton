const app  = require('../app');
const http = require('http');

/*
 * Start the web server listening on a port
 */

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || process.config.server.port || '3000');
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(portNumber) {
  const portAsInt = parseInt(portNumber, 10);

  if (isNaN(portAsInt)) {
    // named pipe
    return portNumber;
  }

  if (portAsInt >= 0) {
    // port number
    return portAsInt;
  }

  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  const id   = process.worker ? `(${process.worker.id}) ` : '';

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${id}${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  const id   = process.worker ? `(${process.worker.id}) ` : '';
  console.log(`${id}Listening on ${bind}`);
}
