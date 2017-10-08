// original author @helam
// original source https://screeps.slack.com/files/U1PCE23QF/F3KSV7KKK/queueAction___system.js

// ESLint directives
/* global QueuedAction */

/**
 * INTERNAL USE ONLY.
 * Author: Helam
 * @param {Number} id
 * @param {Function} action
 * @param {*} stopResult
 * @param {Number} tickLimit
 * @param {Number} startTime
 * @constructor
 */
global.QueuedAction = function({id, action, stopResult, tickLimit, startTime}) {
  this.id = id || CommonLib.getNextIntegerId();
  this.action = id ? action : `return (${action.toString()})()`;
  this.stopResult = stopResult;
  this.tickLimit = tickLimit || 100;
  this.startTime = startTime || Game.time;
};

/**
 * INTERNAL USE ONLY.
 * Run the queued action and return false if:
 *  1. There is an error
 *  2. The return value of the queued action is equal to the stopResult
 *  3. The queued action has been run [tickLimit] number of times
 * Author: Helam
 * @return {Boolean}
 */
QueuedAction.prototype.run = function() {
  const func = Function(this.action);
  try {
    const result = func();
    if (result === this.stopResult) {
      return false;
    }
    if (Game.time - this.startTime >= this.tickLimit) {
      return false;
    }
  } catch (error) {
    console.log(error.stack);
    return false;
  }
  return true;
};

/**
 * INTERNAL USE ONLY.
 * Add the action to the queue.
 * Author: Helam
 */
QueuedAction.prototype.add = function() {
  Memory.queuedActions[this.id] = this;
};

/**
 * INTERNAL USE ONLY.
 * Remove the queued action from the queue.
 * Author: Helam
 */
QueuedAction.prototype.clear = function() {
  delete Memory.queuedActions[this.id];
};

/**
 * Put somewhere in the main loop.
 * Calls all of the queued actions.
 * Author: Helam
 */
QueuedAction.runQueuedActions = function() {
  Object.keys(Memory.queuedActions || {})
    .forEach((id) => {
      const action = new QueuedAction(Memory.queuedActions[id]);
      if (!action.run()) action.clear();
    });
};

/**
 * Call this function to add an action to the queue.
 * Author: Helam
 * @param {Function} action (the function you want called)
 * @param {*} stopResult (return value of the function that should signal removing the action from the queue)
 * @param {Number} tickLimit (max number of ticks to call the function. default 100)
 */
QueuedAction.queueAction = function(action, stopResult, tickLimit) {
  Memory.queuedActions = Memory.queuedActions || {};
  const newAction = new QueuedAction({action, stopResult, tickLimit});
  newAction.add();
};
