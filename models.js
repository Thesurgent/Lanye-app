const mongoose = require('mongoose');

// Define the schema for the model data
const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
