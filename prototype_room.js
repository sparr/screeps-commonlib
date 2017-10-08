/*
 * Defines a .mineral property for rooms that caches and gives you the mineral object for a room
 * original author @helam
 * original source https://screeps.slack.com/files/U1PCE23QF/F3ZUNES6A/Room_mineral.js
 */
Object.defineProperty(Room.prototype, 'mineral', {
  get: function() {
    // undefined on the first request each tick, mineral object or null after
    if (this._mineral === undefined) {
      // undefined on the first request, mineral id or null after
      if (this.memory.mineralId === undefined) {
        const [mineral] = this.find(FIND_MINERALS);
        if (mineral) {
          this._mineral = mineral;
          this.memory.mineralId = mineral.id;
        } else {
          this._mineral = this.memory.mineralId = null;
        }
      } else {
        this._mineral = Game.getObjectById(this.memory.mineralId);
      }
    }
    return this._mineral;
  },
  enumerable: false,
  configurable: true,
});
