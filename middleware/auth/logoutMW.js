/**
 * Destroy current session for the user, than redirect to '/'
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        req.session.destroy(err => {
            res.redirect('/');
        });
    };
};