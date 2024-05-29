/**
 * Destroy current session for the user, than redirect to '/'
 */
module.exports = function(objectrepository) {
    return function(req, res, next) {
        req.session.destroy((err) => {
            console.log("Logout - Session destroyed!");
            return next();
        });
    };
};