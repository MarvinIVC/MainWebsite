const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebaseKey.json'); // Make sure to replace with your Firebase key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com" // Replace with your Firebase database URL
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

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
