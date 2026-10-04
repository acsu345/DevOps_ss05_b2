// Module Authentication - hoan chinh
const crypto = require('crypto');

function authenticate(username, password) {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }
    console.log('Authenticating user:', username);
    return verifyPassword(username, password);
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function verifyPassword(username, password) {
    const hashed = hashPassword(password);
    // TODO: compare with stored hash
    console.log('Verifying password for:', username);
    return true;
}

function generateToken(username) {
    return crypto.randomBytes(32).toString('hex');
}

module.exports = { authenticate, hashPassword, verifyPassword, generateToken };
