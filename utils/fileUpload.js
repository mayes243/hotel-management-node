const crypto = require('crypto');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb){
        cb(null, 'dev-' + Date.now() + crypto.randomBytes(16).toString('hex') + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;