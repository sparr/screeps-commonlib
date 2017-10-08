// original author @warinternal
// original source https://screeps.slack.com/files/U1XTCBJ9L/F37RQEBRC/lookNear___lookForNear.js
RoomObject.prototype.lookNear = function(asArray, range = 1) {
  const {x, y} = this.pos;
  return this.room.lookAtArea(Math.max(0, y - range),
    Math.max(0, x - range),
    Math.min(49, y + range),
    Math.min(49, x + range),
    asArray);
};
RoomObject.prototype.lookForNear = function(lookFor, asArray, range = 1) {
  const {x, y} = this.pos;
  return this.room.lookForAtArea(lookFor,
    Math.max(0, y - range),
    Math.max(0, x - range),
    Math.min(49, y + range),
    Math.min(49, x + range),
    asArray);
};
