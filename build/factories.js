var harvester_factory = require('factory.harvester');

var miner_factory = require('factory.miner');

var builder_factory = require('factory.builder');

var upgrader_factory = require('factory.upgrader');

var repairer_factory = require('factory.repairer');

var warrior_factory = require('factory.warrior');

var factories = {
  harvester: harvester_factory,
  miner: miner_factory,
  builder: builder_factory,
  upgrader: upgrader_factory,
  repairer: repairer_factory,
  warrior: warrior_factory
};