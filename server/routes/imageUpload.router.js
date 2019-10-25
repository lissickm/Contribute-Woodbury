const express = require('express');
const router = express.Router();
require('dotenv').config();


const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

//POST UPLOADED FILE TO CLOUDINARY FOLDER & RETURN THE RESULT WITH URL
router.post('/', (req, res) => {
    const file = req.files.file;
    
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        res.send(result)
    })
    
})


module.exports = router;