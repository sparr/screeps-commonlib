// original author @helam
// original source https://screeps.slack.com/files/U1PCE23QF/F3MDETD2B/modified_link_transferEnergy_to_prevent_redundant_multiple_sends_to_the_same_target.js
// Prevents multiple sends to the same to-be-almost-full target in one tick
StructureLink.prototype._transferEnergy = StructureLink.prototype.transferEnergy;
StructureLink.prototype.transferEnergy = function(target, amount) {
  if (target._isFull || target.energy >= LINK_CAPACITY - 1) {
    return ERR_FULL;
  }

  const transferResult = this._transferEnergy(target, amount);

  if (transferResult === OK) {
    const transferred = (amount || this.energy) * (1 - LINK_LOSS_RATIO);
    if (target.energy + transferred >= LINK_CAPACITY * (1 - LINK_LOSS_RATIO)) {
      target._isFull = true;
    }
  }
  return transferResult;
};
