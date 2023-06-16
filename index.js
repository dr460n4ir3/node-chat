const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Message = require('./models/messages');
const User = require('./models/user');

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Set the strictQuery option to suppress the deprecation warning
mongoose.set('strictQuery', false);

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    // Start the server after successful MongoDB connection
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Socket.io setup
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

// Socket.io event handling
io.on('connection', (socket) => {
  console.log(socket.id,'A user connected');
/*
  // Handle new user event
  socket.on('new user', (username) => {
    console.log(`New user: ${username}`)
  });*/
/*
  // Handle chat message event
  socket.on('chat message', (msg) => {
    console.log(`Message: ${msg}`);
  });
*/
  socket.emit('messageFromServer', { data: 'Welcome to the chat!' });
  socket.on('messageFromClient', (data) => {
    console.log(`Data: ${data}`);
    });

  // Handle disconnection event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

//Create a new user
app.post('/users', async (req, res) => {
    try {
      const { username, email } = req.body;
      
      // Create a new user instance
      const newUser = new User({
        username,
        email,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  });
  

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
