/**
 * Using the template engine, renders the values into the template
 */

module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        res.render(viewName, res.locals);
    };
};