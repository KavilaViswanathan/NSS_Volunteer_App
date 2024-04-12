const express = require('express')
const router = express.Router();

const{
    signUpAdmin,
    insertVolunteer,
    UpdateVolunteer,
    getVolunteer,
    deleteVol,
    signin
} = require('../controller/admin_controller')

const {
    getRegisteration
} = require('../controller/user_controller')

router.get('/signin/:admin_email/:admin_password',signin);
router.get('/ActivityRegister',getRegisteration)
router.get('/Activity',getVolunteer)
router.post('/signup',signUpAdmin)
router.post('/insertActivity',insertVolunteer)
router.put('/updatetActivity/:vol_id',UpdateVolunteer)
router.delete('/deleteVol/:vol_id',deleteVol)

module.exports = router