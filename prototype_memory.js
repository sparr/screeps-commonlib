// original author @warinternal
// original source https://screeps.slack.com/files/U1XTCBJ9L/F3K6RH485/ownedstructure_memory.js

// This is called during global reset to set up structure memory,
// because it doesn't need to be called often.
if (!Memory.structures) {
  if (_.get(global, 'config.commonlib.log.init')) {
    console.log('[Memory] Initializing structure memory');
  }
  Memory.structures = {};
}

// Adds memory to Structure or OwnedStructure entities.
// OwnedStructure can be garbage collected reliably. Structure might GC when visibility is lost.
Object.defineProperty(
  (_.get(global, 'config.commonlib.memory.unownedStructure')?Structure:OwnedStructure).prototype,
  'memory', {
    get: function() {
      return (Memory.structures[this.id] = Memory.structures[this.id] || {});
    },
    set: function(v) {
      return _.set(Memory, 'structures.' + this.id, v);
    },
    configurable: true,
    enumerable: false,
  }
);

/**
 * Delete Memory for nonexistent entities
 * @param {Object}  options
 * @param {Boolean} options.creep
 * @param {Boolean} options.structure
 */
CommonLib.MemoryGC = function({creep, structure}) {
  if (creep) {
    for (const name in Memory.creeps) {
      if (!Game.creeps[name]) {
        if (_.get(global, 'config.commonlib.log.gc')) {
          console.log('[Memory] GC Deleting Memory.creeps[\'' + name + '\']');
        }
        delete Memory.creeps[name];
      }
    }
  }
  if (structure) {
    for (const id in Memory.structures) {
      if (!Game.structures[id]) {
        if (_.get(global, 'config.commonlib.log.gc')) {
          console.log('[Memory] GC Deleting Memory.structures[\'' + id + '\']');
        }
        delete Memory.structures[id];
      }
    }
  }
};
