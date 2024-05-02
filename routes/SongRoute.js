const express = require('express')

const router = express.Router();

const SongController=require('../controller/SongController');
const verifyToken = require('../middleware/AuthMiddleware');

// router.post("/file/addfile",SongController.addfiles)
router.get("/file/getfile",SongController.getfiles)
router.get("/file/findbyartistname/:artistName",SongController.findbyartistname)
router.post("/file/addfav/:fav",SongController.addfav)


module.exports = router