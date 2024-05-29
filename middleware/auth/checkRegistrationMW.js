const requireOption = require('../requireOption');

/**
 * Check if the user is registered.
 * If not, create a new user and redirect to /.
 */

module.exports = function (objectrepository) {
    let UserModel = requireOption(objectrepository, 'UserModel');
    console.log("model loaded");

    return function (req, res, next) {

        // Check if the request contains the necessary data
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            console.log("CheckRegistration - Not enough data!");
            return next();
        }

        // Check if the user exists
        UserModel.findOne({
            email: req.body.email
        }, function (err, result) {
            if (err || result !== null) {
                res.locals.error = 'E-mail address is already registered!';
                console.log("CheckRegistration - E-mail address is already registered!");
                return next();
            }

            if(req.body.password != req.body.password2) {       // There might be a problem here
                res.locals.error = 'Passwords do not match!';
                console.log("CheckRegistration - Passwords do not match!");
                return next();
            }

            // Create new user
            let newUser = new UserModel();
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.save(function (err) {
                if (err) {
                    return next(err);
                }
                console.log("CheckRegistration - saved");

                // Redirect to /
                return res.redirect('/');
            });
        });

    };
};