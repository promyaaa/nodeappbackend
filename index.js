// const express = require("express");
// const cors = require("cors");

// const app = express();

// const port = process.env.PORT || 4000; // default port 4000

// const news = require("./data/news.json");
// const categories = require("./data/categories.json");

// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("node server running");
// });

// app.get("/about", (req, res) => {
//   res.send("About Us Page");
// });

// app.get("/news", (req, res) => {
//   res.send(news);
// });

// app.get("/news/:id", (req, res) => {
//   id = req.params.id;
//   const selectedNews = news.find((n) => (n._id = id));
//   res.send(selectedNews);
// });

// app.get("/category/:id", (req, res) => {
//   id = req.params.id;
//   console.log(id);
//   const selectedNews = news.filter((n) => n.category_id == id);
//   res.send(selectedNews);
// });

// app.get("/categories", (req, res) => {
//   res.send(categories);
// });

// app.listen(port, () => {
//   console.log(`Server is running... on http://localhost:${port}`);
// });

// server.js
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Import the Firebase Admin SDK JSON key file
const serviceAccount = require('./firebase-sdk.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Express and middlewares
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("node server running");
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema and model
const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  otherInfo: { type: String }, // You can add more fields as necessary
});

const User = mongoose.model('User', UserSchema);

// Middleware to validate Firebase token
const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    // Verify the token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;  // Attach user data (uid, email, etc.) to request
    next();  // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(403).send({ message: 'Unauthorized: Invalid token' });
  }
};

// Route to handle user registration (protected)
app.post('/api/register', authenticateToken, async (req, res) => {
  const { uid, email } = req.user;  // Use decoded user from the Firebase token
  console.log(uid);
  console.log(email);
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Create a new user in MongoDB
    const newUser = new User({ uid, email, otherInfo: "Default Info" });
    await newUser.save();
    res.status(200).send({ message: 'User registered in MongoDB' });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error });
  }
});

// Route to handle user login and fetch data (protected)
app.post('/api/login', authenticateToken, async (req, res) => {
  const { uid } = req.user;  // Use decoded user from the Firebase token

  try {
    // Find the user in MongoDB by UID
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user data', error });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running... on http://localhost:${PORT}`);
});
