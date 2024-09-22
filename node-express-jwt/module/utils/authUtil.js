const jwt = require('./jwt');
const utils = require('./utils');
const statusCode = require('./statusCode');
const responseMessage = require('./responseMessage');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authMiddleware = {
    //middleware
    //미들웨어로 token이 있는지 없는지 확인하고
    //token이 있다면 jwt.verify함수를 이용해서 토큰 hash를 확인하고 토큰에 들어있는 정보 해독
    validToken: async(req, res, next) => {
        const token = req.cookies?.token?.token;
        if(!token) return res.status(statusCode.UNAUTHORIZED).send(utils.successFalse(responseMessage.EMPTY_TOKEN));
        
        // decode
        const user = await jwt.verify(token);
        // 유효기간 만료
        if (user === TOKEN_EXPIRED) return res.status(statusCode.UNAUTHORIZED).send(utils.successFalse(responseMessage.EXPIRED_TOKEN));
        // 유효하지 않는 토큰
        if (user === TOKEN_INVALID) return res.status(statusCode.UNAUTHORIZED).send(utils.successFalse(responseMessage.INVALID_TOKEN));
        if (user.email === undefined) return res.status(statusCode.UNAUTHORIZED).send(utils.successFalse(responseMessage.INVALID_TOKEN));
        
        req.decoded = user;            
        next();
    }   
};

module.exports = authMiddleware;