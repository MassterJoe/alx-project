const crypto = require('crypto');

// Generate a random string of hexadecimal characters
const randomString = crypto.randomBytes(64).toString('hex');

console.log(randomString);
