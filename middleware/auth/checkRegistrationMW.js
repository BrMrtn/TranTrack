/**
 * Check if the user is registered.
 * If not, create a new user and redirect to /.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    let UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {

        // Check if the request contains the necessary data
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.name === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined') ){
            return next();
        }

        if (req.body.name == '' || req.body.email == '' || req.body.password == '') {
            res.locals.error = 'You must fill in all fields!';
            return next();
        }

        UserModel.findOne({
            email: req.body.email
        }, function (err, result) {
            // Check if the user is already registered
            if (err || result !== null) {
                res.locals.error = 'E-mail address is already registered!';
                return next();
            }

            // Check if the passwords match
            if(req.body.password != req.body.password2) {
                res.locals.error = 'Passwords do not match!';
                return next();
            }

            // Create new user
            let newUser = new UserModel();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.save(function (err) {
                if (err) {
                    return next(err);
                }

                // Redirect to /
                return res.redirect('/');
            });
        });

    };
};