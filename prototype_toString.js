/**
 * Renders a RoomPosition into plain text or an HTML string
 * HTML version links to the Room, may change GUI selection and memory watch
 *
 * original author @semperrabbit
 * Please include the above line with any reproductions or derivatives of the
 * following four functions.
 * original source https://screeps.slack.com/files/U1VSERWHF/F3SP3684W/Creep__Spawn_and_Structure__toString.js
 *
 * @param  {Boolean} htmlLink - should this string be rendered in HTML?
 * @param  {String}  id - which entity should be focused in the client when the link is clicked?
 * @param  {String}  memWatch - which memory path should be added to the memory browser?
 * @return {String}  the rendered RoomPosition in html or plain text
 */
RoomPosition.prototype.toString = function(htmlLink = true, id = undefined, memWatch = undefined) {
  const outString = '[${ this.roomName } ${ this.x },${ this.y }]';
  if (htmlLink) {
    let onClick = '';
    // if no id was specified, select the first object at the position with an id
    if (!id) {
      const targets = this.look();
      for (const target of targets) {
        if (target.id) {
          id = target.id;
          break;
        }
      }
    }
    // if an id was specified or found, make the link change the GUI selection to that entity
    if (id) {
      onClick += `angular.element('body').injector().get('RoomViewPendingSelector').set('${id}');
                  angular.element($('body')).scope().$broadcast(
                    'roomObjectSelected', _.filter(
                      angular.element(document.getElementsByClassName('room ng-scope')).scope().Room.objects,
                      (o)=>o._id==='${id}'
                    )[0]
                  );`;
    }
    // if a memWatch was specified, make the link add a watch entry to the memory browser
    if (memWatch) {
      onClick += `angular.element($('section.memory')).scope().Memory.addWatch('${memWatch}');` +
                 `angular.element($('section.memory')).scope().Memory.selectedObjectWatch='${memWatch}';`;
    }
    return `<a href="#!/room/${Game.shard.name}/${this.roomName}" onClick="${onClick}">${outString}</a>`;
  }
  return outString;
};
Creep.prototype.toString = function(htmlLink = true) {
  return `[${(this.name ? this.name : this.id)} ${this.pos.toString(htmlLink, this.id, 'creeps.'+this.name)}]`;
};
Structure.prototype.toString = function(htmlLink = true) {
  return `[structure (${this.structureType}) #${this.id} ${this.pos.toString(htmlLink, this.id, 'structures.' + this.id)}]`;
};
StructureSpawn.prototype.toString = function(htmlLink = true) {
  return `[spawn ${this.name} ${this.pos.toString(htmlLink, this.id, 'spawns.' + this.name)}]`;
};
