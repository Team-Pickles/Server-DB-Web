const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    sign: (user_id) => {
        const payload = { id: user_id };
        return jwt.sign(payload, JWT_SECRET, {
            algorithm: process.env.JWT_ALGORITHM,
            expiresIn: process.env.JWT_ACCESS_EXPIREIN
        });
    },
    verify: (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
            return {
                ok: true,
                id: decoded.id,
                exp: decoded.exp.toString()
            };
        } catch(err) {
            return {
                ok: false,
                message: err.message
            };
        }
    },
    refresh: (user_id) => {
        return jwt.sign({ id: user_id }, JWT_SECRET, {
            algorithm: process.env.JWT_ALGORITHM,
            expiresIn: process.env.JWT_REFRESH_EXPIREIN,
        });
    },
    refreshVerify: (token) => {
        try {
            jwt.verify(token, JWT_SECRET);
            return {
                ok: true,
                token: token
            };
        } catch (err) {
            return {
                ok: false,
                message: err.message
            };
        }
    },
    decode: (token) => {
        try {
            return jwt.decode(token);
        } catch (Err) {
            return null;
        }
    }
}