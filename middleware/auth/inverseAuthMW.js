/**
 * If the user is not authenticated, call next, otherwise redirect to /:userid
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.session.userid !== 'undefined') {
            return res.redirect('/' + req.session.userid);
        }
        return next();
    };
};