const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const queriesController = require('../controllers/queriesController');
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
                queriesController.getUnsetPropertyId()
                    .then(result => {

                        let image = new models.Images({
                            propertyId: result[0].id,
                            imageLink: `/images/uploads/${req.file.filename}`
                        });


                        image.save((err) => {
                            if (err) {
                                return res.send(err);
                            }
                        })
                            .then(() => {
                                queriesController.getImages(result[0].id)
                                    .then(images => {
                                        res.render('imagePage', {
                                            msg: 'File Uploaded!',
                                            images: images
                                        });
                                    })
                            })
                    })
                    .catch((err) => {
                        return res.send(err);
                    });
            }
        }
    });
};