/**
 * Load all transactions of the user from the database
 * and put it on res.locals.transactions
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const TransactionModel = requireOption(objectrepository, 'TransactionModel');

    return function (req, res, next) {
        // Check if the userid is set
        if (typeof req.session.userid === 'undefined' || req.session.userid == null) {
            console.log("getTransactions - No userid found in the session!");
            return next();
        }

        // Load the transactions from the database
        TransactionModel.find({
            _userid: res.locals.user._id
        }, (err, result) => {
            if (err) {
                res.locals.error = 'Error occured while loading the transactions!';
                console.log("getTransactions - Error while loading transactions from database!");
                return next(err);
            }

            res.locals.transactions = result;
            console.log("getTransactions - Transactions loaded from database!");
            return next();
        });

    };
};