
// Local Imports
const countries = require('./../utils/countriesData');
const fileUpload = require('./../utils/fileUpload');
const { deleteImage } = require('./../utils/customFunctions');

// Models
const Dish = require('./../models/Dish');
const Category = require('./../models/Category');
const Special = require('./../models/Special');

exports.getAllDishes= async(req, res) => {

    const allDishes = await Dish.find().sort('-createdAt').populate('category');

    res.render('backend/dishes/all', {
        title: 'All Dishes',
        allDishes
    });
};

exports.getAddDish = async(req, res) => {

    const categories = await Category.find();

    res.render('backend/dishes/add', {
        title: 'Add Dish',
        countries,
        categories
    });
};

exports.getEditDish = async(req, res) => {
    const dish = await Dish.findById(req.params.id).populate('category');
    const categories = await Category.find();

    res.render('backend/dishes/edit', {
        title: 'Edit Dish',
        dish,
        countries,
        categories
    })
}

exports.uploadImage = fileUpload.single('image');

exports.submitAddDish = async(req, res) => {

    let image = '';
    if(req.file){
        image = req.file.filename
    };

    const newDish = new Dish({
        ...req.body,
        image
    });

    try{
        const savedDish = await newDish.save();
        req.flash('success-message', `${savedDish.name} added Successfully!!!`);
        res.redirect('/admin/all-dishes')
    }catch(err){
        req.flash('error-message', 'Oops! Something went wrong.');
        res.redirect(req.originalUrl);
    }
    
};

exports.submitEditDish = async(req, res) => {
    const selectedDish = await Dish.findById(req.params.id);
    
    let image = selectedDish.image;

    if(req.file){
        deleteImage(selectedDish, req);
        image = req.file.filename;
    }

    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, {
        ...req.body,
        image
    });

    req.flash('success-message', `${updatedDish.name} has been updated successfully!!!`);
    res.redirect('/admin/all-dishes');

};

exports.deleteDish = async(req, res) => {
    const dishToDelete = await Dish.findById(req.params.id);

    if(dishToDelete.image){
        deleteImage(dishToDelete, req);
    }

    const deletedPost = await Dish.findByIdAndDelete(dishToDelete._id);
    req.flash('success-message', `${deletedPost.name} has been deleted Successfully!!!`);
    res.redirect('/admin/all-dishes');
};

// Special Dishes

exports.getSpecialDishes = async(req, res) => {

    const dishes = await Dish.find();
    const specialDishes = await Special.find().sort('-createdAt').populate({
        path: 'dish',
        populate: 'category'
    });

    res.render('backend/dishes/special', {
        title: 'Special',
        dishes,
        specialDishes
    });
};

exports.submitSpecialDish = async(req, res) => {

    const specialDish = new Special({
        dish: req.body.dish
    });

    const savedSpecial = await specialDish.save();
    req.flash('success-message', `Special Dish has been added Successfully!!!`);
    res.redirect('/admin/special');
};

exports.deleteSpecial = async (req, res) => {

    const deletedSpecial = await Special.findByIdAndRemove(req.params.id);

    req.flash('success-message', `Special Dish has been Deleted Successfully!!!`);
    res.redirect('/admin/special');
};