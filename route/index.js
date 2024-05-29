const authMW = require('../middleware/auth/authMW');
const mainRedirectMW = require('../middleware/mainRedirectMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');
const checkLoginMW = require('../middleware/auth/checkLoginMW');
const checkRegistrationMW = require('../middleware/auth/checkRegistrationMW');
const logoutMW = require('../middleware/auth/logoutMW');
const renderMW = require('../middleware/renderMW');
const delTransactionMW = require('../middleware/transaction/delTransactionMW');
const getTransactionsMW = require('../middleware/transaction/getTransactionsMW');
const saveTransactionMW = require('../middleware/transaction/saveTransactionMW');
const delUserMW = require('../middleware/user/delUserMW');
const getUserMW = require('../middleware/user/getUserMW');
const getUsersMW = require('../middleware/user/getUsersMW');
const saveUserMW = require('../middleware/user/saveUserMW');

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

    app.use('/:userid',
        authMW(objRepo),
        getUserMW(objRepo),
        getTransactionsMW(objRepo),
        /*delTransactionMW(objRepo),
        saveTransactionMW(objRepo),*/
        renderMW(objRepo, 'transactions'));
    
    app.use('/admin',
        authMW(objRepo),
        getUsersMW(objRepo),
        delUserMW(objRepo),
        saveUserMW(objRepo),
        renderMW(objRepo, 'bankview'));

    app.use('/logout', logoutMW(objRepo));

    app.use('/',
        inverseAuthMW(objRepo),
        checkLoginMW(objRepo),
        renderMW(objRepo, 'index'));
};