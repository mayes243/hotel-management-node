// Local Imports
const Category = require('./../models/Category');

exports.getAllCategory = async(req, res) => {

    const allCategory = await Category.find().sort('index');

    res.render('backend/category/all', {
        title: 'Category',
        allCategory
    })
};

exports.submitCategory = async(req, res) => {
    if(!req.body.title){
        req.flash('error-message', 'Please Enter the Title');
        res.redirect(req.originalUrl);
    }

    const newCategory = new Category({
        ...req.body
    });

    const savedCategory = await newCategory.save();
    req.flash('success-message', `${savedCategory.title} has been added Successfully!!!`);
    res.redirect(req.originalUrl);
};

exports.getEditCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);

    res.render('backend/category/edit', {
        title: 'Edit Category',
        category
    })
};

exports.submitEditCategory = async (req, res) => {

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
        ...req.body
    });

    req.flash('success-message', `${updatedCategory.title} has been updated Successfully!!!`);
    res.redirect('/admin/category');

};

exports.deleteCategory = async (req, res) => {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    req.flash('success-message', `${deletedCategory.title} has been Deleted Successfully!!!`);
    res.redirect('/admin/category');
};