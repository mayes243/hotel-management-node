// Local Imports
const fileUpload = require('./../utils/fileUpload');
const { deleteImage } = require('./../utils/customFunctions');

const Testimonial = require('./../models/Testimonial');

exports.getAllTestimonials = async(req, res) => {

    const allTest = await Testimonial.find().sort('-createdAt');

    res.render('backend/testimonials/all', {
        title: 'All Testimonials',
        allTest
    });
};

exports.getAddTestimonial = async(req, res) => {

    res.render('backend/testimonials/add', {
        title: 'Add Testimonial'
    });
};

exports.uploadImage = fileUpload.single('image');

exports.submitAddTestimonial = async(req, res) => {

    let image = '';
    if(req.file){
        image = req.file.filename
    };

    const newTest = new Testimonial({
        ...req.body,
        image
    });

    try{
        const savedTestimonial = await newTest.save();
        req.flash('success-message', `${savedTestimonial.name}'s Review Added Successfully!`);
        res.redirect('/admin/all-testimonials');
    }catch(err){
        console.log(err);
        res.redirect(req.originalUrl);
    }
    
};

exports.getEditTestimonial = async(req, res) => {
    const test = await Testimonial.findById(req.params.id);

    res.render('backend/testimonials/edit', {
        title: 'Edit Testimonial',
        test
    });
};

exports.submitEditTestimonial = async(req, res) => {

    const selectedTest = await Testimonial.findById(req.params.id);

    let image = selectedTest.image;
    if(req.file){
        deleteImage(selectedTest, req);
        image = req.file.filename;
    }

    const updatedTest = await Testimonial.findByIdAndUpdate(req.params.id, {
        ...req.body,
        image
    });

    req.flash('success-message', `${updatedTest.name} has been updated successfully!!!`);
    res.redirect('/admin/all-testimonials');

}

exports.deleteTestimonial = async(req, res) => {
    
    const selectedTest = await Testimonial.findById(req.params.id);

    if(selectedTest.image){
        deleteImage(selectedTest, req);
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(selectedTest._id);
    req.flash('success-message', `${deletedTestimonial.name} has been deleted Successfully!!!`);
    res.redirect('/admin/all-testimonials');

};