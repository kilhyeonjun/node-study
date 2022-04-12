const jwt = require('jsonwebtoken');
const {secretKey, option} = require('../../../config/secretkey')
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: (user) => {
        const payload = {
            name : user.name,
            email : user.email
        };
        const result = {
            token: jwt.sign(payload, secretKey, option)           
        };
        return result;
    },    

    verify: async (token) => {
        let decoded;
        try {
            // verify를 통해 값 decode!
            decoded = jwt.verify(token, secretKey);
        } catch (err) {
            console.log(err);
            if (err.message === 'jwt expired') return TOKEN_EXPIRED;
            else if (err.message === 'invalid token') return TOKEN_INVALID;
            else return TOKEN_INVALID;
        }
        return decoded;
    }
} 
