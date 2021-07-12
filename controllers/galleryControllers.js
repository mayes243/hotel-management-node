// Local Imports
const fileUpload = require('./../utils/fileUpload');
const { deleteImage } = require('./../utils/customFunctions');

const Gallery = require('./../models/Gallery');

exports.getGallery = async(req, res) => {

    const allImages = await Gallery.find().sort('-createdAt');

    res.render('backend/gallery/all', {
        title: 'Gallery',
        allImages
    });3333333
};

exports.getAddImage = async(req, res) => {

    res.render('backend/gallery/add', {
        title: 'Add Image'
    });
};

exports.uploadImage = fileUpload.single('image');

exports.submitAddImage = async(req, res) => {

    let image = '';
    if(req.file){
        image = req.file.filename
    };

    const newImage = new Gallery({
        ...req.body,
        image
    });

    try{
        const savedImage = await newImage.save();
        req.flash('success-message', `${savedImage.title} has been Added Successfully!`);
        res.redirect('/admin/gallery');
    }catch(err){
        res.redirect(req.originalUrl);
    }
    
};

exports.deleteImage = async(req, res) => {
    
    const selectedImage = await Gallery.findById(req.params.id);

    if(selectedImage.image){
        deleteImage(selectedImage, req);
    }

    const deletedImage = await Gallery.findByIdAndDelete(selectedImage._id);
    req.flash('success-message', `${deletedImage.title} has been deleted Successfully!!!`);
    res.redirect('/admin/gallery');

};