/**
 * Deletes every transaction of the user from the database.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const TransactionModel = requireOption(objectrepository, 'TransactionModel');

    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            console.log("delTransactions - No useris found in the session!");
            return next();
        }

        if (typeof res.locals.transactions === 'undefined') {
            console.log("delTransactions - No transactions found for the user!");
            return next();
        }

        // Load the transactions of the user from the database and delete them
        TransactionModel.deleteMany({
            _userid: res.locals.user._id
        }, (err) => {
            if (err) {
                res.locals.error = 'Error occured while deleting the transactions!';
                console.log("delTransactions - Error while deleting transactions from database!");
                return next(err);
            }
            
            console.log("delTransactions - Transaction deleted from database!");
            return next();
        });
    };
}