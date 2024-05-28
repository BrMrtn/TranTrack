const authMW = require('../middleware/auth/authMW');
const checkPasswordMW = require('../middleware/auth/checkPasswordMW');
const logoutMW = require('../middleware/auth/logoutMW');
const renderMW = require('../middleware/renderMW');
const delTransactionMW = require('../middleware/transaction/delTransactionMW');
const getTransactionsMW = require('../middleware/transaction/getTransactionsMW');
const saveTransactionMW = require('../middleware/transaction/saveTransactionMW');
const delUserMW = require('../middleware/user/delUserMW');
const getUsersMW = require('../middleware/user/getUsersMW');
const saveUserMW = require('../middleware/user/saveUserMW');

const transactionModel = require('../models/transaction');
const userModel = require('../models/user');

module.exports = function (app) {
    const objRepo = {
        transactionModel: transactionModel,
        userModel: userModel
    };

    app.use('/register',
        saveUserMW(objRepo),
        renderMW(objRepo, 'register'));

    app.use('/:userid',
        authMW(objRepo),
        getTransactionsMW(objRepo),
        delTransactionMW(objRepo),
        saveTransactionMW(objRepo),
        renderMW(objRepo, 'transactions'));
    
    app.use('/admin',
        authMW(objRepo),
        getUsersMW(objRepo),
        delUserMW(objRepo),
        saveUserMW(objRepo),
        renderMW(objRepo, 'bankview'));

    app.use('/logout', logoutMW(objRepo));

    app.use('/',
        checkPasswordMW(objRepo),
        renderMW(objRepo, 'index'));
};