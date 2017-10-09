// original author @proximo
// original source https://screeps.slack.com/files/U2MHSQRJ9/F3B4NRENA/Idle_Suspend_for_creeps.js

/**
 * Set the unit to idle-mode for a given time
 * Get the unit's remaining idle time
 *
 * To make idle mode effective, add this to your creep action code:
 * if(creep.idleTime) continue;
 *
 * @type {Integer}
 */
Object.defineProperty(Creep.prototype, 'idleTime', {
  get: function() {
    if (!(this.memory.idleUntil > Game.time)) {
      delete(this.memory.idleUntil);
      return 0;
    }
    return this.memory.idleUntil - Game.time;
  },
  set: function(val) {
    if (!val && this.memory.idleUntil) {
      delete(this.memory.idleUntil);
    } else {
      this.memory.idleUntil = Game.time + val + 1;
    }
  },
});

