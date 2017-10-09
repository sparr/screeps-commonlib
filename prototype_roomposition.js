CommonLib.DIRECTION_TO_DXDY = [
  [0, 0], //   0, center / stationary, not a real Screeps direction!
  [0, -1], //  1, North
  [1, -1], //  2, NorthEast
  [1, 0], //   3, East
  [1, 1], //   4, SouthEast
  [0, 1], //   5, South
  [-1, 1], //  6, SouthWest
  [-1, 0], //  7, West
  [-1, -1], // 8, NorthWest
];

/**
 * Utility function turning a dx/dy difference into a direction constant.
 *
 * original author @daboros
 * original source https://screeps.slack.com/files/U1UJH3RGB/F3E2RJUET/moveTo_version_supporting_raw_PathFinder_arguments__and_a_moveByPath_which_directly_reads_serialized_strings.js
 *
 * Note: ignores magnitude of arguments, and only looks at sign.
 *
 * @param  {Number} dx
 * @param  {Number} dy
 * @return {Number} direction
 */
CommonLib.dxdyToDirection = function(dx, dy) {
  if (dx < 0) {
    if (dy < 0) {
      return TOP_LEFT;
    } else if (dy > 0) {
      return BOTTOM_LEFT;
    } else {
      return LEFT;
    }
  } else if (dx > 0) {
    if (dy < 0) {
      return TOP_RIGHT;
    } else if (dy > 0) {
      return BOTTOM_RIGHT;
    } else {
      return RIGHT;
    }
  } else {
    if (dy < 0) {
      return TOP;
    } else if (dy > 0) {
      return BOTTOM;
    } else {
      // both dx and dy are 0!
      return 0; // not a real Screeps direction!
    }
  }
};

// returns a RoomPosition given a RoomPosition and a direction
RoomPosition.prototype.getNeighbor = function(direction) {
  const x = this.x + CommonLib.DIRECTION_TO_DXDY[direction][0];
  const y = this.y + CommonLib.DIRECTION_TO_DXDY[direction][1];
  if (x < 0 || x > 49 || y < 0 || y > 49) {
    return null;
  }
  return new RoomPosition(x, y, this.roomName);
};

// original author @warinternal
// original source https://screeps.slack.com/files/U1XTCBJ9L/F37RQEBRC/lookNear___lookForNear.js
RoomPosition.prototype.lookNear = function(asArray, range=1) {
  return this.room.lookAtArea(
    Math.max(0, this.y - range),
    Math.max(0, this.x - range),
    Math.min(49, this.y + range),
    Math.min(49, this.x + range),
    asArray
  );
};
RoomPosition.prototype.lookForNear = function(lookFor, asArray, range=1) {
  return this.room.lookForAtArea(
    lookFor,
    Math.max(0, this.y - range),
    Math.max(0, this.x - range),
    Math.min(49, this.y + range),
    Math.min(49, this.x + range),
    asArray
  );
};
RoomObject.prototype.lookNear = function(...args) {
  return this.pos.lookNear(...args);
};
RoomObject.prototype.lookForNear = function(...args) {
  return this.pos.lookForNear(...args);
};
