const express = require('express');
const router = express.Router({mergeParams: true});
const validToken = require('../module/utils/authUtil').validToken; // token 유효성 검사 미들웨어
const User = require('../controllers/user');

//user routes
router.post('/signup', User.signUp); // 회원가입
router.post('/signin', User.signIn); // 로그인
router.post('/logout', User.logout); // 로그아웃
router.get('/', User.find); // 모든회원정보 보기
router.delete('/delete/:email', User.delete); // 계정 삭제
router.get('/test', validToken, User.test); // jwt 인증 테스트

module.exports = router;