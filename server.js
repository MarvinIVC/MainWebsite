const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // Use environment port or default to 3000
const RATINGS_FILE = path.join(__dirname, 'ratings.txt');

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

// Endpoint to handle rating submission
app.post('/submit-rating', (req, res) => {
    const rating = req.body.rating;

    if (!rating) {
        return res.status(400).json({ error: 'Rating is required' });
    }

    // Append the rating to the file
    fs.appendFile(RATINGS_FILE, `${rating}\n`, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Rating submitted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
