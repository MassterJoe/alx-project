const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const User = require('../models/user');
const authRoutes = require('./auth');

app.use(express.json());
app.use('/api', routes);

app.use('/api/auth', authRoutes);


// Listen for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
