const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const mcq = require('../models/mcq');
const auth = require('./authMiddleware');

// Create an MCQ with validation
const valid = [
  body('question').notEmpty().trim().escape(),
  body('option1').notEmpty().trim().escape(),
  body('option2').notEmpty().trim().escape(),
  body('option3').notEmpty().trim().escape(),
  body('option4').notEmpty().trim().escape(),
  body('correct_option').isInt({ min: 1, max: 4 }),
];
router.post(
  '/mcqs',auth,
  valid,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, option1, option2, option3, option4, correct_option } = req.body;

    const insertQuery = `
      INSERT INTO mcqs (question, option1, option2, option3, option4, correct_option)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    /* The run method is typically used to execute SQL queries that don't return a result set 
    (e.g., INSERT, UPDATE, DELETE queries).*/
    
    mcq.run(
      insertQuery,
      [question, option1, option2, option3, option4, correct_option],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'MCQ created successfully' });
        }
      }
    );
  }
);

// Get all MCQs
router.get('/mcqs', auth, (req, res) => {
  const selectQuery = 'SELECT * FROM mcqs';
  mcq.all(selectQuery, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Get a single MCQ by ID with validation
router.get('/mcqs/:id', [
  // Validate the ID parameter
  param('id').isInt({ min: 1 }),
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const mcqId = req.params.id;
  const selectQuery = 'SELECT * FROM mcqs WHERE id = ?';

  mcq.get(selectQuery, [mcqId], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'MCQ not found' });
    }
  });
});

// Update an MCQ by ID with validation
const valid_put =  [
  param('id').isInt({ min: 1 }), // Validate the ID parameter
  body('question').notEmpty().trim().escape(),
  body('option1').notEmpty().trim().escape(),
  body('option2').notEmpty().trim().escape(),
  body('option3').notEmpty().trim().escape(),
  body('option4').notEmpty().trim().escape(),
  body('correct_option').isInt({ min: 1, max: 4 }),
]
router.put('/mcqs/:id', auth, valid_put, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const mcqId = req.params.id;
  const { question, option1, option2, option3, option4, correct_option } = req.body;

  const updateQuery = `
    UPDATE mcqs
    SET question = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, correct_option = ?
    WHERE id = ?
  `;

  mcq.run(
    updateQuery,
    [question, option1, option2, option3, option4, correct_option, id],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'MCQ updated successfully' });
      }
    }
  );
});

// Delete an MCQ by ID with validation
router.delete('/mcqs/:id', auth, [
  param('id').isInt({ min: 1 }), // Validate the ID parameter in the URL
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const mcqId = req.params.id;
  const deleteQuery = 'DELETE FROM mcqs WHERE id = ?';

  mcq.run(deleteQuery, [mcqId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'MCQ deleted successfully' });
    }
  });
});

module.exports = router;
