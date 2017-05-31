const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');

// Get API route //
const api = require('./server/routes/api');

// Parsers for POST data //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Distribution path //
app.use(express.static(path.join(__dirname, 'dist')));

// Cross Origin middleware //
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");

  if ('OPTIONS' === req.method) { 
    return res.send(200); 
  }

  next();
})

// Set api route //
app.use('/api', api);

// Catch all other routes and return the index file //
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// Socket.io match chat //
io.on('connection', (socket) => {
  console.log('user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  let currentMatchChat;
  socket.on('join-match-chat', (msg) => {
    socket.join(msg); // Joins specific match room, using match id
    currentMatchChat = msg;
  })

  socket.on('new-message', (message) => {
    io.in(currentMatchChat).emit('message', message);    
  });
});

// Get port from environment and store //
const port = process.env.PORT || '3000';
app.set('port', port);

// Listen on port //
server.listen(port, () => console.log(`API running on localhost:${port}`));