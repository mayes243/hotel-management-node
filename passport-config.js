const Admin = require('./models/Admin');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

exports.initializeAdmin = (passport) => {
    // Defining Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async(req, email, password, done) => {
        const user = await Admin.findOne({ email: email}).select('+password');
        if(!user) {
            return done(null, false, req.flash('error-message', 'Sorry! This email doesnot exists.'))
        }

        try{

            await bcrypt.compare(password, user.password, (err, passwordMatched) => {
                if(err){
                    return console.log(err);
                }
        
                if(!passwordMatched){
                    return done(null, false, req.flash('error-message', 'Invalid Username or Password.'));
                }
            
                return done(null, user);
            });


        }catch(err){
            return done(null, false, req.flash('error-message', 'Oops! Something went wrong.'))
        }

    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, user) {
            done(err, user);
        });
    });
};