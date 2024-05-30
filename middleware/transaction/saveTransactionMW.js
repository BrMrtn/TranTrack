/**
 * Using parameters from POST, saves a transaction to the database.
 * If res.locals.transaction is set, updates the transaction.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const TransactionModel = requireOption(objectrepository, 'TransactionModel');

    return function (req, res, next) {
        // Check if the request contains the necessary data
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.date === 'undefined') ||
            (typeof req.body.amount === 'undefined') ||
            (typeof req.body.isExpense === 'undefined') ||
            (typeof req.body.category === 'undefined') ){
            return next();
        }

        if (req.body.date == '' || req.body.amount == '' || req.body.category == '' ) {
            res.locals.error = 'Not all necessary fields are filled!';
            return next();
        }

        // Check if the transaction is already set
        if (typeof res.locals.transaction === 'undefined') {
            res.locals.transaction = new TransactionModel();
        }

        // Set the transaction's data
        res.locals.transaction.date = req.body.date;
        res.locals.transaction.amount = req.body.amount;
        res.locals.transaction.isExpense = req.body.isExpense;
        res.locals.transaction.category = req.body.category;
        res.locals.transaction.comment = req.body.comment;
        res.locals.transaction._userid = req.session.userid;

        // Save the transaction
        res.locals.transaction.save((err) => {
            if (err) {
                res.locals.error = 'Error occured while saving the transaction!';
                return next(err);
            }

            return res.redirect('/' + req.session.userid);
        });
    };

};