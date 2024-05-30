/**
 * Deletes choosen transaction from the database.
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.transaction === 'undefined') {
            return next();
        }

        res.locals.transaction.remove((err) => {
            if (err) {
                res.locals.error = 'Error occured while deleting the transaction!';
                return next(err);
            }

            return next();
        });
    };
};