const express = require('express')
const router = express.Router()

const AuthController = require('../controller/AuthController')
const verifyToken = require('../middleware/AuthMiddleware')

router.post("/form/signup",AuthController.register)
router.post("/form/login",AuthController.login)

router.get("/form/getdetails",AuthController.getdetails)
router.get("/form/findbyuserName/:userName",verifyToken,AuthController.findbyusername)

module.exports = router
