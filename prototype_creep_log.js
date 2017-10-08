/**
 * Globally patch creep actions to log error codes.
 * original author @warinternal
 * original source https://screeps.slack.com/files/U1XTCBJ9L/F57BEAWCW/creep_action_error_handler.js
 */
['attack', 'attackController', 'build', 'claimController', 'dismantle', 'drop',
  'generateSafeMode', 'harvest', 'heal', 'move', 'moveByPath', 'moveTo', 'pickup',
  'rangedAttack', 'rangedHeal', 'rangedMassAttack', 'repair', 'reserveController',
  'signController', 'suicide', 'transfer', 'upgradeController', 'withdraw'].forEach(
  (method) => {
    const original = Creep.prototype[method];
    // Replace the method
    Creep.prototype[method] = function() {
      // Call the original method
      const status = original.apply(this, arguments);
      // Report result if it's an error
      if (typeof status === 'number' && status < 0) {
        // convert error number to error code if available
        const prettyStatus = LOOKUP_ERR ? LOOKUP_ERR[status] : status;
        // if Creep.prototype.log is provided, use it
        if (this.log) {
          this.log(`action ${method} failed with status ${prettyStatus} at ${this.pos}`);
        } else {
          console.log(`Creep ${this.name} action ${method} failed with status ${prettyStatus} at ${this.pos}`);
        }
      }
      return status;
    };
  }
);
