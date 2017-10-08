/**
 * Reverse lookup tables
 * original author @warinternal
 * original source https://screeps.slack.com/files/U1XTCBJ9L/F4APWV6A1/Reverse_lookup_tables_for_errors__colors__and_resources.js
 */
/* global LOOKUP_ERR, LOOKUP_COLOR, LOOKUP_FIND, LOOKUP_STRUCT, LOOKUP_RES */
global.LOOKUP_ERR = _(global)
  .pick((v, k) => k.startsWith('ERR_'))
  .invert()
  .value();
LOOKUP_ERR[OK] = 'OK';

global.LOOKUP_COLOR = _(global)
  .pick((v, k) => k.startsWith('COLOR_'))
  .invert()
  .value();

global.LOOKUP_FIND = _(global)
  .pick((v, k) => k.startsWith('FIND_'))
  .invert()
  .value();

global.LOOKUP_STRUCT = _(global)
  .pick((v, k) => k.startsWith('STRUCTURE_'))
  .invert()
  .value();

global.LOOKUP_RES = _(global)
  .pick((v, k) => k.startsWith('RESOURCE_'))
  .invert()
  .value();

// original author @warinternal
// original source https://screeps.slack.com/files/U1XTCBJ9L/F4WMZ4ND7/Unicode_directional_arrows.js
/* global UNICODE_ARROWS */
global.UNICODE_ARROWS = {
  [TOP]          : '\u2191',
  [TOP_RIGHT]    : '\u2197',
  [RIGHT]        : '\u2192',
  [BOTTOM_RIGHT] : '\u2198',
  [BOTTOM]       : '\u2193',
  [BOTTOM_LEFT]  : '\u2199',
  [LEFT]         : '\u2190',
  [TOP_LEFT]     : '\u2196',
};

// original author @engineeryo
// original source https://screeps.slack.com/files/U37KHPDRA/F71JREQCC/resource_colors.js
/* global RESOURCE_COLORS */
global.RESOURCE_COLORS = {
  H: '#989898',
  O: '#989898',
  U: '#48C5E5',
  L: '#24D490',
  K: '#9269EC',
  Z: '#D9B478',
  X: '#F26D6F',
  energy: '#FEE476',
  power: '#F1243A',

  OH: '#B4B4B4',
  ZK: '#B4B4B4',
  UL: '#B4B4B4',
  G: '#FFFFFF',

  UH: '#50D7F9',
  UO: '#50D7F9',
  KH: '#A071FF',
  KO: '#A071FF',
  LH: '#00F4A2',
  LO: '#00F4A2',
  ZH: '#FDD388',
  ZO: '#FDD388',
  GH: '#FFFFFF',
  GO: '#FFFFFF',

  UH2O: '#50D7F9',
  UHO2: '#50D7F9',
  KH2O: '#A071FF',
  KHO2: '#A071FF',
  LH2O: '#00F4A2',
  LHO2: '#00F4A2',
  ZH2O: '#FDD388',
  ZHO2: '#FDD388',
  GH2O: '#FFFFFF',
  GHO2: '#FFFFFF',

  XUH2O: '#50D7F9',
  XUHO2: '#50D7F9',
  XKH2O: '#A071FF',
  XKHO2: '#A071FF',
  XLH2O: '#00F4A2',
  XLHO2: '#00F4A2',
  XZH2O: '#FDD388',
  XZHO2: '#FDD388',
  XGH2O: '#FFFFFF',
  XGHO2: '#FFFFFF',
};
