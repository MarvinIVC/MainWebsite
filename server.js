const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebaseKey.json');  // Make sure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rate-3f585-default-rtdb.firebaseio.com" // Replace with your Firebase project's database URL
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS to allow requests from different origins
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

// Endpoint to handle rating submission
app.post('/submit-rating', async (req, res) => {
  const rating = req.body.rating;

  if (!rating) {
    return res.status(400).json({ error: 'Rating is required' });
  }

  try {
    // Add rating to Firestore
    await db.collection('ratings').add({ rating: rating, timestamp: new Date() });
    res.json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error writing to Firestore', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
