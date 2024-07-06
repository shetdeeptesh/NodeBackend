const { compareSync } = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const saltRounds = 10;

module.exports = {
    hashPassword: (password) => {
        const hashedPW = bcrypt.hashSync(password, saltRounds);
        return hashedPW;
    },
    comparePassword: (hashedPW, UserPassword) => {
        return compareSync(UserPassword,hashedPW);
    }
}