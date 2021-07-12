// Local Imports
const fileUpload = require('./../utils/fileUpload');
const { deleteImage } = require('./../utils/customFunctions');

const Banner = require('./../models/Banner');

exports.getAllBanners = async(req, res) => {

    const allBanners = await Banner.find().sort('-createdAt');

    res.render('backend/banner/all', {
        title: 'All Banners',
        allBanners
    });
};

exports.getAddBanner = async(req, res) => {

    res.render('backend/banner/add', {
        title: 'Add Banner'
    });
};

exports.uploadImage = fileUpload.single('image');

exports.submitAddBanner = async(req, res) => {

    let image = '';
    if(req.file){
        image = req.file.filename
    };

    const newBanner = new Banner({
        ...req.body,
        image
    });

    try{
        const savedBanner = await newBanner.save();
        req.flash('success-message', `${savedBanner.title} has been Added Successfully!`);
        res.redirect('/admin/all-banners');
    }catch(err){
        console.log(err);
        res.redirect(req.originalUrl);
    }
    
};

exports.getEditBanner = async(req, res) => {
    const banner = await Banner.findById(req.params.id);

    res.render('backend/banner/edit', {
        title: 'Edit Banner',
        banner
    });
};

exports.submitEditBanner = async(req, res) => {

    const selectedBanner = await Banner.findById(req.params.id);

    let image = selectedBanner.image;
    if(req.file){
        deleteImage(selectedBanner, req);
        image = req.file.filename;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, {
        ...req.body,
        image
    });

    req.flash('success-message', `${updatedBanner.title} has been updated successfully!!!`);
    res.redirect('/admin/all-banners');

};

exports.deleteBanner = async(req, res) => {
    
    const selectedBanner = await Banner.findById(req.params.id);

    if(selectedBanner.image){
        
        deleteImage(selectedBanner, req);
    }

    const deletedBanner = await Banner.findByIdAndDelete(selectedBanner._id);
    req.flash('success-message', `${deletedBanner.title} has been deleted Successfully!!!`);
    res.redirect('/admin/all-banners');

};