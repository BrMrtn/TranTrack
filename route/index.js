const authMW = require('../middleware/auth/authMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');
const checkLoginMW = require('../middleware/auth/checkLoginMW');
const checkRegistrationMW = require('../middleware/auth/checkRegistrationMW');
const logoutMW = require('../middleware/auth/logoutMW');
const renderMW = require('../middleware/renderMW');
const delTransactionMW = require('../middleware/transaction/delTransactionMW');
const delTransactionsMW = require('../middleware/transaction/delTransactionsMW');
const getTransactionMW = require('../middleware/transaction/getTransactionMW');
const getTransactionsMW = require('../middleware/transaction/getTransactionsMW');
const saveTransactionMW = require('../middleware/transaction/saveTransactionMW');
const delUserMW = require('../middleware/user/delUserMW');
const getUserMW = require('../middleware/user/getUserMW');

const TransactionModel = require('../models/transaction');
const UserModel = require('../models/user');

module.exports = function (app) {
    const objRepo = {
        TransactionModel: TransactionModel,
        UserModel: UserModel
    };

    app.use('/register',
        inverseAuthMW(objRepo),
        checkRegistrationMW(objRepo),
        renderMW(objRepo, 'register'));

    app.get('/logout',
        logoutMW(objRepo),
        function (req, res, next) {
            return res.redirect('/');
        });

    app.get('/:userid/:transactionid/del',
        authMW(objRepo),
        getUserMW(objRepo),
        getTransactionMW(objRepo),
        delTransactionMW(objRepo),
        function (req, res, next) {
            return res.redirect('/');
        });

    app.use('/:userid/:transactionid/update',
        authMW(objRepo),
        getUserMW(objRepo),
        getTransactionMW(objRepo),
        saveTransactionMW(objRepo),
        renderMW(objRepo, 'transactionUpdate'));

    app.use('/:userid/del',
        authMW(objRepo),
        getUserMW(objRepo),
        getTransactionsMW(objRepo),
        delTransactionsMW(objRepo),
        delUserMW(objRepo),
        logoutMW(objRepo),
        function (req, res, next) {
            return res.redirect('/');
        });

    app.use('/:userid',
        authMW(objRepo),
        getUserMW(objRepo),
        getTransactionsMW(objRepo),
        saveTransactionMW(objRepo),
        renderMW(objRepo, 'transactions'));

    app.use('/',
        inverseAuthMW(objRepo),
        checkLoginMW(objRepo),
        renderMW(objRepo, 'index'));
};