const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files (like images or styles) from the public directory
app.use(express.static('public'));

// MongoDB connection string (replace with your actual MongoDB URI)
const dbURI = 'mongodb://localhost:27017/lanye-app'; // Local MongoDB URI

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
  });

// Define Model schema (this will define the structure of model data in MongoDB)
const modelSchema = new mongoose.Schema({
  name: String,
  city: String,
  status: String
});

// Create Model based on schema
const Model = mongoose.model('Model', modelSchema);

// Create a basic route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to Lanye App Backend!');
});

// Route to get model data from MongoDB
app.get('/models', async (req, res) => {
  try {
    const models = await Model.find(); // Fetch all models from MongoDB
    res.json(models); // Send them back as JSON
  } catch (err) {
    console.log('Error fetching models:', err);
    res.status(500).send('Server error');
  }
});

// Catch-all error handler (optional but good practice)
app.use((req, res, next) => {
  res.status(404).send('Sorry, we couldn\'t find that!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
