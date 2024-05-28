/**
 * Loads a dependency from an object repository
 */
function requireOption(objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
        return objectRepository[propertyName];
    }
    throw new TypeError(`${propertyName} required`);
}

module.exports = requireOption;