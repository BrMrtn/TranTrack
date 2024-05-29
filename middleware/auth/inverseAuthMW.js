/**
 * If the user is not authenticated, call next, otherwise redirect to /:userid
 */

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.session.userid !== 'undefined') {
            console.log("InverseAuth - User is already logged in!");
            return res.redirect('/' + req.session.userid);
        }
        console.log("InverseAuth - User is not logged in!");
        return next();
    };
};