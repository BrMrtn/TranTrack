/**
 * If the user is authenticated, call next, otherwise redirect to /
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            console.log("Auth - User is not logged in!");
            return res.redirect('/');
        }
        console.log("Auth - User is already logged in!");
        return next();
    };
};