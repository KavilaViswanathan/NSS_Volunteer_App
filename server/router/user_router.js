const express = require('express')
const router = express.Router();

const{
    usersignup,
    volunteerActivity,
    signin
}=require('../controller/user_controller')


router.post('/signup',usersignup)
router.post('/register/',volunteerActivity)
router.get('/signin/:user_email/:user_password',signin);
module.exports = router