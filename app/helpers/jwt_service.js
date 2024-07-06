const jwt = require("jsonwebtoken");
const jwtSecKey = process.env.jwtSecKey || "SEC_KEY";

module.exports = {
    sign: (payload) => {
        var signOptions = {
            expiresIn: "90d",    // 90 days validity
        };
        return jwt.sign(payload, jwtSecKey, signOptions);
    },
    decode: (token) => {
        return jwt.decode(token, { complete: true });
        //returns null if token is invalid
    },
    verify:(token) => {
        return jwt.verify(token,jwtSecKey);
    }
}
