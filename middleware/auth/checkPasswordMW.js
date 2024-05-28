/**
 * Check password. If correct, create a session for the user and redirect to /:userid
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};