/**
 * Deletes user and it's transactions from the database.
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }

        res.locals.user.remove((err) => {
            if (err) {
                res.locals.error = 'Error occured while deleting the user!';
                return next(err);
            }

            return next();
        });
    };
};