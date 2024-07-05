const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/project-management-tool', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes setup
app.use('/api/auth', authRoutes); // Mount authRoutes on /api/auth

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build')); // Serve static files from the React build directory

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // Serve React's index.html for all other routes
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
