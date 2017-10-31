const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

router.use(express.static('./public'));

const storage = multer.diskStorage({
    destination: './public/images/uploads',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 3000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('photos');

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}

router.get('/upload', function(req, res){
    res.render('upload');
});


//upload
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('upload', {
                msg:err
            });
        } else {
            if(req.file == undefined){
                res.render('upload', {
                   msg: 'Error: No File Selected!'
                });
            } else {
                res.render('upload', {
                    msg: 'File Uploaded',
                    file: `images/uploads/${req.file.filename}`
                });
            }
        }
    });
});
module.exports = router;
