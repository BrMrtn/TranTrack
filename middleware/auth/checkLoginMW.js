/**
 * Check username and password.
 * If correct, create a session for the user and redirect to /:userid. If not, set error message.
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    let UserModel = requireOption(objectrepository, 'UserModel');
    
    return function (req, res, next) {
        
        // Check if the request contains the necessary data
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        if (req.body.email == '' || req.body.password == '') {
            res.locals.error = 'You must fill in all fields!';
            return next();
        }
        
        // Check if the user exists and the password is correct
        UserModel.findOne({
            email: req.body.email
        }, function (err, result) {
            // Check if the user exists
            if (err || !result) {
                res.locals.error = 'E-mail address is not registered!';
                return next();
            }

            // Check if the password is correct
            if (result.password !== req.body.password) {
                res.locals.error = 'Incorrect password!';
                return next();
            }
            
            // Create session for the user
            req.session.userid = result._id;

            // Redirect to /:userid
            return res.redirect('/' + result._id);
        });

    };
};