const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY || "SEC_KEY";
const expiresIn = process.env.JWT_EXPIRES || "90d";

function sign(payload){
    var signOptions = {
        expiresIn: expiresIn,    // 90 days validity by default
    };
    return jwt.sign(payload, secret_key, signOptions);
}

function decode(token){
    return jwt.decode(token, { complete: true });
}

function verify(token){
    return jwt.verify(token, secret_key);
}

module.exports = { sign, decode, verify }
