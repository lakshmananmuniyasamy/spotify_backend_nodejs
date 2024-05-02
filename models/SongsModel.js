var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var SongSchema = new Schema({
    songName  : {type: String , require :true},
    language : { type: String , require: true},
    artistName: { type: String , require: true},
    artistImage: { type: String , require: true},
    songImage: { type: String , require: true},
    song: { type: String , require: true},
    category: {type: String, require: true}
},{timestamps: true})

module.exports = mongoose.model("Songs",SongSchema);

