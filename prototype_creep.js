/**
 * Augmented versions of built-in Creep.getActiveBodyparts
 * counts non-destroyed body parts of a given type
 * optional second parameter causes boosts be counted as increasing body part count
 *
 * original author @daboross
 * original source https://screeps.slack.com/files/U1UJH3RGB/F3ABHV6F5/freshly_minted_getactivebodyparts_accounting_for_boosts_.js
 * This function is released under the MIT license
 *
 * @param  {String} type - type of body part
 * @param  {String} action - optional specific action to add boost effects for
 * @return {Number}
 */
Creep.prototype.getActiveBodyparts = function(type, action) {
  let total = 0;
  for (let i = this.body.length; i-- > 0;) {
    const part = this.body[i];
    if (part.hits <= 0) {
      break;
    }
    if (part.type === type) {
      if (action && part.boost !== undefined) {
        total += BOOSTS[type][part.boost][action];
      } else {
        total += 1;
      }
    }
  }
  return total;
};

/**
 * Augmented version of built-in Creep.getBodyparts
 * counts body parts of a given type
 * optional second parameter causes boosts be counted as increasing body part count
 *
 * original author @daboross
 * original source https://screeps.slack.com/files/U1UJH3RGB/F3ABHV6F5/freshly_minted_getactivebodyparts_accounting_for_boosts_.js
 * This function is released under the MIT license
 *
 * @param  {String} type - type of body part
 * @param  {String} action - optional specific action to add boost effects for
 * @return {Number}
 */
Creep.prototype.getBodyparts = function(type, action) {
  let total = 0;
  for (let i = this.body.length; i-- > 0;) {
    const part = this.body[i];
    if (part.type === type) {
      if (action && part.boost !== undefined) {
        total += BOOSTS[type][part.boost][action];
      } else {
        total += 1;
      }
    }
  }
  return total;
};
