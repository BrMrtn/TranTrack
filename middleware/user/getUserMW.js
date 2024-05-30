/**
 * Load one users from the database based on the :userid param
 * and put it on res.locals.user
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        // Load the user from the database
        UserModel.findOne({
            _id: req.params.userid
        }, (err, result) => {
            if (err || !result) {
                return next(err);
            }

            res.locals.user = result;
            return next();
        });
    };
};