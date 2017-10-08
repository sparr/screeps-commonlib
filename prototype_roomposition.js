CommonLib.DIRECTION_TO_XY = [
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

// returns a RoomPosition given a RoomPosition and a direction
RoomPosition.prototype.getNeighbor = function(direction) {
  const x = this.x + CommonLib.DIRECTION_TO_XY[direction][0];
  const y = this.y + CommonLib.DIRECTION_TO_XY[direction][1];
  if (x < 0 || x > 49 || y < 0 || y > 49) {
    return null;
  }
  return new RoomPosition(x, y, this.roomName);
};
