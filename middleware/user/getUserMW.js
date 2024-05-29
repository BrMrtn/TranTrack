/**
 * Load one users from the database based on the :userid param
 * and put it on res.locals.user
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        // Check if the userid param is set
        if (typeof req.params.userid === 'undefined' || req.params.userid == null) {
            console.log("getUser - No userid parameter found in the request!");
            return next();
        }

        // Load the user from the database
        UserModel.findOne({
            _id: req.params.userid
        }, (err, result) => {
            if (err || !result) {
                console.log("getUser - Error / User not found in the database!");
                return next(err);
            }

            res.locals.user = result;
            console.log("getUser - User loaded from database!");
            return next();
        });
    };
};