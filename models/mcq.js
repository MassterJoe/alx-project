
const db = require('../src/db');

/* Define the MCQ schema and create the table
db.serializes() ensures that they are executed 
in sequential order or one after the other.
*/

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS mcqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT,
      option1 TEXT,
      option2 TEXT,
      option3 TEXT,
      option4 TEXT,
      correct_option INTEGER
    )
  `);
});

module.exports = db;
