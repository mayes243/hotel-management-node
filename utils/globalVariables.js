const globalVariables = (req, res, next) => {
    res.locals.success_message = req.flash('success-message');
    res.locals.error_message = req.flash('error-message');
    res.locals.user = req.user || null;
    next();
};

module.exports = globalVariables;