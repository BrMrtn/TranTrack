/**
 * Put one transaction of the user from the database to res.locals
 * based on the :transactionid param
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const TransactionModel = requireOption(objectrepository, 'TransactionModel');

    return function (req, res, next) {
        // Check if the transactionid param is set
        if (typeof req.params.transactionid === 'undefined' || req.params.transactionid == null) {
            console.log("getTransaction - No transactionid parameter found in the request!");
            return next();
        }

        // Load the transaction from the database
        TransactionModel.findOne({
            _id: req.params.transactionid
        }, (err, result) => {
            if (err || !result) {
                console.log("getTransaction - Error / Transaction not found in the database!");
                return next(err);
            }

            res.locals.transaction = result;
            console.log("getTransaction - Transaction loaded from database!");
            return next();
        });
    };
};