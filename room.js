// Check single type of room based on room name
// original author @enrico
// original source https://screeps.slack.com/files/U1Y068C6L/F4AD5JJN7/get_room_type_without_visibility__but_regex___.js

// Accepts nonsense directions to improve speed.
// Replace regex '.' with '[WE]' and '[NS]' to make smarter but slower
Room.isHighwayRoom = (roomName) => /^.\d*0.\d*0$/.test(roomName);
Room.isControllerRoom = (roomName) => /(?:^.\d*[1-9].\d*[1-3|7-9]$)|(?:^.\d*[1-3|7-9].\d*[1-9]$)/.test(roomName);
Room.isSourceKeeperRoom = (roomName) => /(^.\d*[4-6].\d*[4|6]$)|(^.\d*[4|6].\d*[4-6]$)/.test(roomName);
Room.isCenterRoom = (roomName) => /(^.\d*5.\d*5$)/.test(roomName);
Room.isCoreRoom = (roomName) => /^.\d*[4-6]+.\d*[4-6]+$/.test(roomName); // = center room + sk rooms

// ESLint directives
/* global ROOM_ERR, ROOM_HIGHWAY, ROOM_CONTROLLER, ROOM_SOURCEKEEPER, ROOM_CENTER */
// Constants for types of rooms
global.ROOM_ERR = -1;
global.ROOM_HIGHWAY = 'highway';
global.ROOM_CONTROLLER = 'controller';
global.ROOM_SOURCEKEEPER = 'sourcekeeper';
global.ROOM_CENTER = 'center';

// Reverse lookup to turn room constants back into their name
global.LOOKUP_ROOM = _(global)
  .pick((v, k) => k.startsWith('ROOM_'))
  .invert()
  .value();

// Returns the room type based on room name
Room.getRoomType = function(roomName) {
  if (Room.isControllerRoom(roomName)) {
    return ROOM_CONTROLLER;
  }
  if (Room.isHighwayRoom(roomName)) {
    return ROOM_HIGHWAY;
  }
  if (Room.isSourceKeeperRoom(roomName)) {
    return ROOM_SOURCEKEEPER;
  }
  if (Room.isCenterRoom(roomName)) {
    return ROOM_CENTER;
  }
  return ROOM_ERR;
};
