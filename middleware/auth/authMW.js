/**
 * If the user is authenticated, call next, otherwise redirect to /
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.session === 'undefined' || typeof req.session.userid === 'undefined') {
            return res.redirect('/');
        }
        return next();
    };
};