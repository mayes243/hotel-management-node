exports.adminAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/admin/login');
    }
}

exports.adminLogout = (req, res) => {
    req.logout();
    res.redirect('/admin/login');
}