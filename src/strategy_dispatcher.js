var nanny = require('role.nanny');
var maintenance = require('role.maintenance');
var builder = require('role.builder');
var miner = require('role.miner');
var repairer = require('role.repairer');
var upgrader = require('role.upgrader');
var warrior = require('role.warrior');
var claimer = require('role.claimer');
var hauler = require('role.hauler');
var healer = require('role.healer');
var destroyer = require('role.destroyer');
var scout = require('role.scout');
var sniper = require('role.sniper');

var manual = {
  perform: (creep) => {}
};

var roles = {
  nanny: nanny,
  maintenance: maintenance,
  builder: builder,
  miner: miner,
  repairer: repairer,
  upgrader: upgrader,
  warrior: warrior,
  healer: healer,
  claimer: claimer,
  hauler: hauler,
  destroyer: destroyer,
  sniper: sniper,
  scout: scout,
  manual: manual
};

var useless = {
  perform: (creep) => creep.moveTo(Game.flags['useless'])
}

module.exports = {
  get_strategy: (creep) => roles[creep.memory['role']] || useless
}