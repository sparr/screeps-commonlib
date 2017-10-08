_.set(global, 'config.commonlib.target.propertyPath', 'memory.targetId');
_.set(global, 'config.commonlib.visual.target', true);

/**
 * Generalized target locking function for actors with memory.
 *
 * original author @warinternal
 * original source https://screeps.slack.com/files/U1XTCBJ9L/F415PTE13/Generalized_target_locking__with_examples_.js
 *
 * Valid actors include creeps, flags, rooms, and any entities such as
 * structures that have been extended with memory.
 *
 * The selector function picks all available candidates, but only runs during
 * the target selection phase. This is where your CPU heavy work should go.
 *
 * The validator function is ran for each candidate, and once per call to
 * ensure the target is still valid for use, so you want this function to be as
 * cheap as possible. The parameter is technically optional, with all values
 * being considered valid. But then why are you using this?
 *
 * The chooser function is ran once at the end of target selection, to pick
 * which of the valid candidates you want to use. This parameter is optional,
 * defaulting to the first item in the array if omitted. It expects a single
 * result so opt for a _.min or _.max over a sort.
 *
 * The prop parameter is the key used to store the target's id in memory. This
 * optionally allows us to have multiple target locks with different names.
 *
 * @param {Function} selector - Gets a list of target candidates
 * @param {Function} validator - Check if a target is still valid
 * @param {Function} chooser - Pick the best target from the list
 * @param {String}   prop - Property name in memory to store the target id
 *
 * @return {Object|null} the current/new target
 */
RoomObject.prototype.getTarget =
function(selector, validator=_.identity, chooser=_.first, prop=config.commonlib.target.propertyPath) {
  // get the current target
  let target = Game.getObjectById(_.get(this, prop));
  // if we have no target or an invalid target, find a new one
  if (!target || !validator(target)) {
    if (_.get(global, 'config.commonlib.visual.target')) {
      this.room.visual.circle(this.pos, {fill: 'red', opacity: 0.5});
    }
    // find every valid target
    const candidates = _.filter(selector.call(this, this), validator);
    if (candidates && candidates.length) {
      // choose a target
      target = chooser(candidates, this);
    } else {
      // no target found
      target = null;
    }
    if (target) {
      // remember the target
      _.set(this, prop, target.id);
    } else {
      // forget that we had a target
      _.set(this, prop, undefined);
    }
  }
  if (target && target.pos.roomName === this.pos.roomName && _.get(global, 'config.commonlib.visual.target')) {
    target.room.visual.line(this.pos, target.pos, {lineStyle: 'dashed', opacity: 0.5});
  }
  return target;
};

RoomObject.prototype.clearTarget = function(prop=config.commonlib.target.propertyPath) {
  // delete this.memory[prop];
  _.set(this, prop, undefined);
};

/*
 * Examples
 *
 * // Choose the weakest damaged structure for a creep to repair
 * Creep.prototype.getRepairTarget = function() {
 *   return this.getTarget(
 *     ({room, pos}) => room.find(FIND_STRUCTURES),
 *     (structure) => structure.hits < structure.hitsMax,
 *     (candidates) => _.min(candidates, 'hits')
 *   );
 * };
 *
 * // Choose the fullest non-empty container for a creep to retrieve from
 * Creep.prototype.getLoadedContainerTarget = function() {
 *   return this.getTarget(
 *     ({room, pos}) => room.find(FIND_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_CONTAINER}),
 *     (container) => _.sum(container.store) > 0,
 *     (containers) => _.max(containers, (c) => _.sum(c.store))
 *   );
 * };
 *
 */
