const Songs = require('../models/SongsModel')
const apiResponse = require('../helpers/apiResponse')

//add songs
exports.addfiles = ((req, res) => {
    const songDetails = req.body;
    const songs = new Songs(songDetails)

    songs.save()
        .then((savedSongs) => {
            // return res.status(200).send(savedSongs);
            // return apiResponse.responseWithData(res,savedSongs,"insert success")
            return apiResponse.responseWithoutData(res,savedSongs,"insert success")

        }).catch((err) => {
            return res.status(500).send(err.message);
        })
})

//list songs
exports.getfiles = [(req, res) => {
    Songs.find()
        .then((songs) => {
            return res.status(200).send(songs)
        }).catch((err) => {
            return res.status(200).send(err.message)
        })
}]


//find by artist name
exports.findbyartistname =[(req,res)=>{
    Songs.find({_artistname:req.params.artistName})
        .then((songs)=>{
            return res.status(200).send(songs)
        }).catch((err)=>{
            return res.status(200).send(err.message)
        })
}]

//add the playlist
exports.addfav = [(req,res)=>{
    const songplaylist = req.body;
    
}]