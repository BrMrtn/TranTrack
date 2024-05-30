/**
 * Deletes choosen transaction from the database.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.transaction === 'undefined') {
            console.log("delTransaction - No transaction found in res.locals!");
            return next();
        }

        res.locals.transaction.remove((err) => {
            if (err) {
                res.locals.error = 'Error occured while deleting the transaction!';
                console.log("delTransaction - Error while deleting transaction from database!");
                return next(err);
            }

            console.log("delTransaction - Transaction deleted from database!");
            return next();
        });
    };
};