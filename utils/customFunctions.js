const fs = require('fs');

exports.deleteImage = (parent, req) => {
    fs.unlink(`${__dirname}/../public/uploads/${parent.image}`, function(err){
        if(err){
            req.flash('error-message', `Oops! Something went wrong.`);
        }
    });
};