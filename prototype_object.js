/**
 * Add a getter property to an object that caches its results
 *
 * original author @warinternal
 * original source https://screeps.slack.com/files/U1XTCBJ9L/F36R17NJD/Cached_dynamic_properties.js
 *
 * @param  {Function} proto - the object prototype in question
 * @param  {String} propertyName
 * @param  {Function} fn - the function to call to calculate the property value
 * @return {Function}
 */
Object.defineCachedGetter = function(proto, propertyName, fn) {
  return Object.defineProperty(proto, propertyName, {
    get: function() {
      if (this === proto || this === undefined) {
        return;
      }
      const result = fn.call(this, this);
      // now replace this function-based getter with a static-value property
      Object.defineProperty(this, propertyName, {
        value: result,
        configurable: true,
        enumerable: false,
      });
      return result;
    },
    configurable: true,
    enumerable: false,
  });
};

/*
 * Usage examples:
 *
 * defineCachedGetter(Creep.prototype, 'carryTotal', c => _.sum(c.carry));
 * defineCachedGetter(Creep.prototype, 'carryCapacityAvailable', c => c.carryCapacity - c.carryTotal);
 */
