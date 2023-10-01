var jwt = require('jsonwebtoken');

export default async function verifyToken(req, res) {
    try {
        const { token } = req.query; // Assuming the token is being passed as a query parameter

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, 'eVVXZfFk1QRTrbPyhzJSf1KmY');
        return res.status(200).json({ user: decoded });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}