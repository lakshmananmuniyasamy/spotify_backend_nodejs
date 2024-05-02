const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Songs = require('./models/SongsModel')


const app = express();
const PORT = process.env.PORT || 8080;

// CORS
app.use(cors({ origin: "*" }));

app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
const MONGODB_URL = "mongodb://127.0.0.1:27017/spotify001";
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`${MONGODB_URL} connection successful`);
    })
    .catch((err) => {
        console.log("error in connecting to MongoDB", err.message);
    });

// Routes import
const userRoutes = require("./routes/UserRoute");
const songRoutes = require("./routes/SongRoute");

// Use routes
app.use(userRoutes);
app.use(songRoutes);

// Middleware for protecting routes
const verifyToken = require("./middleware/AuthMiddleware");

app.get("/unprotected", (req, res) => {
    res.status(200).send("This is an unprotected API");
});

app.get("/protected", verifyToken, (req, res) => {
    res.status(200).send("This is a protected API");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// multer

// Update Multer Configuration
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now(); // Fix typo "Data.now()" to "Date.now()"
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Add Route for File Upload
app.post("/file/upload", upload.fields([
    { name: 'artistImage', maxCount: 1 },
    { name: 'songImage', maxCount: 1 },
    { name: 'song', maxCount: 1 },

]), async (req, res) => {
    console.log("req.file", req.files);

    if (!req.files) {
        return res.status(400).json({ error: "No files uploaded" });
    }

    const { songName, language, artistName, category } = req.body;
    const artistImage = req.files['artistImage'][0].filename;
    const songImage = req.files['songImage'][0].filename;
    const songFile = req.files['song'][0].filename;

    try {
        // Create a new song document with the uploaded image filename
        const newSong = new Songs({
            songName,
            language,
            artistName,
            artistImage,
            songImage,
            song: songFile,
            category
        });

        await newSong.save();

        res.json({ status: "ok" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

