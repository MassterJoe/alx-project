/*
Still working on this
*/

const db = require('../src/db'); 

// User model methods
class User {
  // Find user by username
  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    try {
      const row = await db.get(query, [username]);
      return row;
    } catch (err) {
      throw err;
    }
  }

  // Create a new user
  static async create(username, password) {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    try {
      await db.run(query, [username, password]);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
