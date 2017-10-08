/**
 * Attempts to move the creep away from the room exit it is standing on
 * original author @engineeryo
 * original source https://screeps.slack.com/files/U37KHPDRA/F42GH3H70/Creep_getOffExit.js
 * @return {Number} failure or movement return code
 */
Creep.prototype.moveOffExit = function() {
  // Legal directions from a given exit
  const directionsFromExit = {
    x: {
      49: [7, 8, 6],
      0: [3, 4, 2],
    },
    y: {
      49: [1, 2, 8],
      0: [5, 6, 4],
    },
  };

  // TODO handle escaping diagonal/corner exits for custom servers
  let allowedDirections;
  if (directionsFromExit['x'][this.pos.x]) {
    // on the left or right exit
    allowedDirections = directionsFromExit.x[this.pos.x];
  } else if (directionsFromExit['y'][this.pos.y]) {
    // on the top or bottom exit
    allowedDirections = directionsFromExit.y[this.pos.y];
  }

  if (!allowedDirections) {
    // not on an exit tile
    return ERR_NOT_FOUND;
  }

  let creepDirection;
  for (const direction of allowedDirections) {
    const stuff = this.pos.getNeighbor(direction).look();
    let foundCreep = false;
    if (_.findIndex(stuff, (p) =>
      p.terrain === 'wall' ||
      (p.type === 'creep' && (foundCreep = true)) ||
      (p.structure && OBSTACLE_OBJECT_TYPES[p.structure.structureType])
    ) === -1) {
      // no obstacle in this direction
      return this.move(direction);
    }
    // remember the first direction where we saw a creep, as a last-resort move direction
    if (foundCreep && !creepDirection) {
      creepDirection = direction;
    }
  }

  if (creepDirection) {
    return this.move(creepDirection);
  }

  return ERR_NO_PATH;
};
