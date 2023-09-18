const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const user = require('../models/userTable'); // Import the SQLite database connection
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// User Registration
router.post(
  '/register',
  [
    body('username').notEmpty().trim().escape(),
    body('password').notEmpty().isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, password } = req.body;
      
      // Check if the username already exists
      const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
      user.get(checkUserQuery, [username], async (err, existingUser) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        if (existingUser) {
          return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the users table
        const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        user.run(insertUserQuery, [username, hashedPassword], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          
          res.status(201).json({ message: 'User registered successfully' });
        });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

//
router.post(
    '/login',
    [
      body('username').notEmpty().trim().escape(),
      body('password').notEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { username, password } = req.body;
  
        // Find the user by username
        const findUserQuery = 'SELECT * FROM users WHERE username = ?';
        user.get(findUserQuery, [username], async (err, user) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
  
          // Compare the hashed password
          const passwordMatch = await bcrypt.compare(password, user.password);
  
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }

          // Generate a JWT token with an expiration time
const token = jwt.sign({
    username: req.body.username,
  }, process.env.TOKEN_SECRET, { expiresIn: '30m' }); // '30m' for 30 minutes
  
  // Set the JWT token in the response header
  res.setHeader('Authorization', `Bearer ${token}`);
  

          res.status(200).json({ message: 'Login successful' });
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );

module.exports = router;