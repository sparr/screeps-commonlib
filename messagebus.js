/**
 * Entity Message Bus
 * original author @warinternal
 * original source https://screeps.slack.com/files/U1XTCBJ9L/F4R5ZCAU9/Entity_Message_Bus.js
 */

/**
 * Receive message on room object.
 * Extend this function to any entity using the message bus.
 * e.g. StructureTerminal.prototype.receiveMessage = function(data, sender, tick) {}
 *
 * @param {String|Object} data - string or object sent
 * @param {String} sender - id or name of sender
 * @param {Number} tick - the tick the message was sent on
 *
 * @return {Boolean} false to repeat message (up until it expires)
 *
 */
RoomObject.prototype.receiveMessage = function(data, sender, tick) {
  console.log(`Receiving unhandled message from ${sender} to ${this}, data: ${JSON.stringify(data)}`);
  return true;
};

/**
 * Send a message to an entity to be received on the next tick.
 * The next tick delivery ensures all messages can be processed
 * and states updated before logic begins, as well as preventing
 * infinite loops.
 *
 * @param {String} id - id of recipient
 * @param {String|Object} data - string or object to send
 * @param {Number} expire - time until message expires
 * @param {String} sender - id of recipient
 *
 * @return {Boolean} success of message addition to queue
 */
/* global sendMessage */
global.sendMessage = function(id, data={}, expire=5, sender='global') {
  if (typeof id !== 'string') {
    throw new TypeError('Expected entity id string or flag name');
  }
  console.log(`Sending message at ${Game.time} from ${sender} to ${id}, data: ${JSON.stringify(data)}`);
  Memory.messages = Memory.messages || [];
  return Memory.messages.push({
    id,
    sender,
    data: JSON.stringify(data),
    tick: Game.time,
    expire: Game.time+expire,
  });
};

/**
 * Send a message from an entity
 * @param {String} id - id of recipient
 * @param {String|Object} data - string or object to send
 * @param {Number} expire - time until message expires
 * @return {Boolean} success of message addition to queue
 */
RoomObject.prototype.sendMessage = function(id, data={}, expire=5) {
  return sendMessage(id, data, expire, this.id || this.name);
};

/**
 * Process loop for message bus
 * Call once per tick to deliver messages to entities.
 *
 * Messages may deliver at a later time.
 */
global.processMessages = function() {
  if (!Memory.messages || !Memory.messages.length) {
    return;
  }
  _.remove(Memory.messages, ({id, sender, data, tick, expire}) => {
    if (Game.time <= tick) {
      // don't process messages queued this tick
      return false;
    }
    if (Game.time > expire) {
      // remove expired messages without processing them
      return true;
    }
    const obj = Game.getObjectById(id) || Game.flags[id];
    if (!obj) {
      // don't process messages to non-visible entities
      return false;
    }
    // process remaining messages
    const status = obj.receiveMessage(JSON.parse(data), sender, tick);
    // remove them from the queue if the recipient reports success
    return (status === undefined) ? true : status;
  });
};
