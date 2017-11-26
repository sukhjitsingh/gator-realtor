const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const models = require('../models');


router.use(express.static('./public'));

const storage = multer.diskStorage({
    destination: './public/images/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 3000000},
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('pics');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports.upload = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('imagePage', {
                msg: err
            });
        } else {
            if (req.file === undefined) {
                res.render('imagePage', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                //saveLinks(`/images/uploads/${req.file.filename}`);
                res.render('imagePage', {
                    msg: 'File Uploaded!'
                });
            }
        }
    });
};