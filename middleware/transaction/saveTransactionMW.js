/**
 * Using parameters from POST, saves a transaction to the database.
 * If res.locals.transaction is set, updates the transaction.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const TransactionModel = requireOption(objectrepository, 'TransactionModel');

    return function (req, res, next) {
        // Check if the request contains the necessary data
        if ((typeof req.body === 'undefined') || req.body == null ||
            (typeof req.body.date === 'undefined') || req.body.date == '' ||
            (typeof req.body.amount === 'undefined') || req.body.amount == '' ||
            (typeof req.body.isExpense === 'undefined') || req.body.isExpense == '' ||
            (typeof req.body.category === 'undefined') || req.body.category == '' ) { 
            console.log("saveTransaction - Not enough data!");
            console.log(req.body);
            return next();
        }

        // Check if the transaction is already set
        if (typeof res.locals.transaction === 'undefined') {
            console.log("saveTransaction - Creating new transaction!");
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
                console.log("saveTransaction - Error while saving transaction!");
                return next(err);
            }

            console.log("saveTransaction - Transaction saved!");
            return res.redirect('/' + req.session.userid);
        });
    };

};