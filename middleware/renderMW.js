/**
 * Using the template engine, renders the values into the template
 */
const requireOption = require('./requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        next();
    };
};