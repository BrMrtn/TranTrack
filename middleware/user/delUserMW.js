/**
 * Deletes user and it's transactions from the database.
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.user === 'undefined') {
            console.log("delUser - No user found in res.locals!");
            return next();
        }

        res.locals.user.remove((err) => {
            if (err) {
                res.locals.error = 'Error occured while deleting the user!';
                console.log("delUser - Error while deleting user from database!");
                return next(err);
            }

            console.log("delUser - User deleted from database!");
            return next();
        });
    };
};