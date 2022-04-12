const utils = require('../module/utils/utils');
const responseMessage = require('../module/utils/responseMessage');
const statusCode = require('../module/utils/statusCode');
const User = require('../model/User');
const jwt = require('../module/utils/jwt')

const options = {
    domain: "localhost",
    path: "/",
    httpOnly: true
};

module.exports = {
    // 회원가입
    signUp : async(req, res) => {
        const isDuplicate = await User.findByEmail(req.body.email) ? false : true ;
        const user = {
            email : req.body.email,
            name : req.body.name,
            password : req.body.password
        };
        // 이메일 중복
        if(isDuplicate){
            return res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.ALREADY_ID));
        }
        // 회원가입 진행
        else{
            await User.save(user);
            return res.status(statusCode.OK).send(utils.successTrue(responseMessage.SIGN_UP_SUCCESS, user));
        }
    },

    //로그인하기
    signIn : async(req, res) => {
        // 이메일 주소가 있을 때
        const user = await User.findByEmail({email: req.body.email});
        if(user){
            //비밀번호가 틀렸을 때
            if(user.password !== req.body.password) return res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.SIGN_IN_FAIL));
            //  로그인 성공
            else{
                const token = jwt.sign(user);
                res.cookie("token", token, options);
                return res.status(statusCode.OK).send(utils.successTrue(responseMessage.SIGN_IN_SUCCESS, token));
            }
        }
        // 이메일 없을 떄
        else return res.status(statusCode.BAD_REQUEST).send(utils.successFalse(responseMessage.NO_USER));
    },

    // 사용자 조회
    find : async(req, res) => {
        var users = await User.find();
        return res.json(users);
    },

    logout : async(req, res) => {
        if (req.cookies?.token) res.clearCookie("token");
        return res.status(statusCode.OK).send(utils.successTrue(responseMessage.LOGOUT_SUCCESS));
    },

    test: async(req, res) => {
        return res.status(statusCode.OK).send(utils.successTrue('인증 성공'))
    },
    
}