/**
 * Check if the user is signed in.
 * If not, redirect to /. If yes, redirect to /:userid.
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/');
        } else {
            return res.redirect('/' + req.session.userid);
        }
    };
};