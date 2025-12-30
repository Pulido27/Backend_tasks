const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

console.log(process.env.JWT_SECRET);


if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

const env = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

module.exports = env;