const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authToken = req.headers.authorization || req.headers.Authorization;

    if (authToken && authToken.startsWith('Bearer')) {
        token = authToken.split(' ')[1];

        try {
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log(decoded);
            req.user = decoded.user;
            next();
        } catch (err) {
            res.status(401);
            throw new Error('User is not authorized');
        }
    }
    else {
        res.status(400);
        throw new Error('No token provided');
    }
});

module.exports = validateToken;
