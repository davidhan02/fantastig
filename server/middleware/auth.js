const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, keys.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = auth;
