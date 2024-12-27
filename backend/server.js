// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const companyRoutes = require('./routes/companyRoutes');
const communicationMethodRoutes = require('./routes/communicationMethodRoutes');
const seedCommunicationMethods = require('./scripts/seedCommunicationMethods'); // Corrected import statement

const app = express();

app.use(cors());
app.use(express.json());

// Use the routes for companies and communication methods
app.use('/api', companyRoutes); // Company routes
app.use('/api', communicationMethodRoutes); // Communication methods routes

mongoose.connect('mongodb://127.0.0.1:27017/tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('Database connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to the database');
  seedCommunicationMethods(); // Call the seeding function
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
