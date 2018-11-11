/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to nannies, the swarm doesn't function as intended.

If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/
module.exports = {
  rooms: ["W18S25", "W18S24", "W19S24", "W19S25", "W18S23"],
  templates: [{
    count: 2,
    name_prefix: "miner_W18S25_",
    body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "miner",
      type: "swarm",
      target: 'W18S25',
      find: FIND_SOURCES_ACTIVE,
      resource: RESOURCE_ENERGY
    }
  }, {
    count: 2,
    name_prefix: "builder_",
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "builder",
      type: "swarm"
    }
  }, {
    count: 5,
    name_prefix: "upgrader_W18S25_",
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "upgrader",
      type: "swarm",
      work_place: 'W18S25',
      target: 'W18S25'
    }
  }, {
    count: 3,
    name_prefix: "nanny_W19S25_",
    body: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'nanny',
      type: 'swarm',
      work_place: 'W19S25',
      target: 'W19S25'
    }
  }, {
    count: 2,
    name_prefix: "upgrader_W19S25_",
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "upgrader",
      type: "swarm",
      work_place: 'W19S25',
      target: 'W19S25'
    }
  }, {
    count: 4,
    name_prefix: "upgrader_W18S23_",
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "upgrader",
      type: "swarm",
      work_place: 'W18S23',
      target: 'W18S23'
    }
  }, {
    count: 3,
    name_prefix: "nanny_W18S23_",
    body: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'nanny',
      type: 'swarm',
      work_place: 'W18S23',
      target: 'W18S23'
    }
  }, {
    count: 2,
    name_prefix: "repairer_W18S25_",
    body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "repairer",
      type: "swarm",
      work_place: "W18S25"
    }
  }, {
    count: 1,
    name_prefix: 'warrior_Moon_',
    body: [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK],
    memory: {
      role: 'warrior',
      squad: 'Moon',
      type: "swarm"
    }
  }, {
    count: 1,
    name_prefix: 'healer_Moon_',
    body: [MOVE, MOVE, MOVE, HEAL, HEAL, HEAL],
    memory: {
      role: 'healer',
      squad: 'Moon',
      type: "swarm"
    }
  }, {
    count: 1,
    name_prefix: 'sniper_Moon_',
    body: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'sniper',
      squad: 'Moon',
      type: 'swarm'
    }
  }, {
    count: 1,
    name_prefix: "miner_W18S24_",
    body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "miner",
      target: "W18S24",
      type: "swarm",
      find: FIND_SOURCES_ACTIVE,
      resource: RESOURCE_ENERGY
    }
  }, {
    count: 1,
    name_prefix: "claimer_W18S24_",
    body: [CLAIM, CLAIM, MOVE, MOVE],
    memory: {
      role: "claimer",
      target: "W18S24",
      type: "swarm"
    }
  }, {
    count: 1,
    name_prefix: "repairer_W18S24_",
    body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "repairer",
      type: "swarm",
      work_place: "W18S24"
    }
  }, {
    count: 1,
    name_prefix: 'hauler_W18N24_',
    body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'hauler',
      type: 'swarm',
      work_place: 'W18S25',
      energy_room: 'W18S24',
      link_id: '5bd9c6fffd47502f5f46418c'
    }
  }, {
    count: 1,
    name_prefix: 'warrior_Phobos_',
    body: [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK],
    memory: {
      role: 'warrior',
      squad: 'Phobos',
      type: "swarm"
    }
  }, {
    count: 1,
    name_prefix: 'healer_Phobos_',
    body: [MOVE, MOVE, MOVE, HEAL, HEAL, HEAL],
    memory: {
      role: 'healer',
      squad: 'Phobos',
      type: "swarm"
    }
  }, {
    count: 1,
    name_prefix: 'sniper_Phobos_',
    body: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'sniper',
      squad: 'Phobos',
      type: 'swarm'
    }
  }, {
    count: 1,
    name_prefix: "repairer_W19S24_",
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "repairer",
      type: "swarm",
      work_place: "W19S24"
    }
  }, {
    count: 2,
    name_prefix: 'miner_W19S24_',
    body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'miner',
      type: 'swarm',
      target: 'W19S24',
      find: FIND_SOURCES_ACTIVE,
      resource: RESOURCE_ENERGY
    }
  }, {
    count: 8,
    name_prefix: 'hauler_W19S24_',
    body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'hauler',
      type: 'swarm',
      work_place: 'W18S25',
      energy_room: 'W19S24',
      link_id: '5be5a3d62f3e9313ab7c1de7'
    }
  }, {
    count: 1,
    name_prefix: 'claimer_W19S24_',
    body: [CLAIM, CLAIM, MOVE, MOVE],
    memory: {
      role: 'claimer',
      type: 'swarm',
      work_place: 'W19S24',
      target: 'W19S24'
    }
  }, {
    count: 2,
    name_prefix: 'miner_W19S25_',
    body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'miner',
      type: 'swarm',
      target: 'W19S25',
      find: FIND_SOURCES_ACTIVE,
      resource: RESOURCE_ENERGY
    }
  }, {
    count: 2,
    name_prefix: 'miner_W18S23_',
    body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'miner',
      type: 'swarm',
      target: 'W18S23',
      find: FIND_SOURCES_ACTIVE,
      resource: RESOURCE_ENERGY
    }
  }, {
    count: 1,
    name_prefix: 'warrior_Ganymede_',
    body: [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK],
    memory: {
      role: 'warrior',
      squad: 'Ganymede',
      type: "swarm"
    }
  }, {
    count: 1,
    name_prefix: 'healer_Ganymede_',
    body: [MOVE, MOVE, MOVE, HEAL, HEAL, HEAL],
    memory: {
      role: 'healer',
      squad: 'Ganymede',
      type: "swarm"
    }
  }, {
    count: 1,
    name_prefix: 'sniper_Ganymede_',
    body: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'sniper',
      squad: 'Ganymede',
      type: 'swarm'
    }
  }, {
    count: 1,
    name_prefix: "repairer_W17S24_",
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "repairer",
      type: "swarm",
      work_place: "W17S24"
    }
  }, {
    count: 1,
    name_prefix: 'claimer_W17S24_',
    body: [CLAIM, CLAIM, MOVE, MOVE],
    memory: {
      role: 'claimer',
      type: 'swarm',
      work_place: 'W17S24',
      target: 'W17S24'
    }
  }, {
    count: 1,
    name_prefix: 'miner_W17S24_',
    body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'miner',
      type: 'swarm',
      target: 'W17S24',
      find: FIND_SOURCES_ACTIVE,
      resource: RESOURCE_ENERGY
    }
  }, {
    count: 2,
    name_prefix: 'hauler_W17S24_',
    body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'hauler',
      type: 'swarm',
      work_place: 'W18S25',
      energy_room: 'W17S24',
      link_id: '5bd9c6fffd47502f5f46418c'
    }
  }, {
    count: 1,
    name_prefix: 'warrior_Io_',
    body: [TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK],
    memory: {
      role: 'warrior',
      squad: 'Io',
      type: "swarm"
    }
  }, {
    count: 1,
    name_prefix: 'healer_Io_',
    body: [MOVE, MOVE, MOVE, HEAL, HEAL, HEAL],
    memory: {
      role: 'healer',
      squad: 'Io',
      type: "swarm"
    }
  }, {
    count: 1,
    name_prefix: 'sniper_Io_',
    body: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'sniper',
      squad: 'Io',
      type: 'swarm'
    }
  }, {
    count: 1,
    name_prefix: "repairer_W19S23_",
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: "repairer",
      type: "swarm",
      work_place: "W19S23"
    }
  }, {
    count: 1,
    name_prefix: 'claimer_W19S23_',
    body: [CLAIM, CLAIM, MOVE, MOVE],
    memory: {
      role: 'claimer',
      type: 'swarm',
      work_place: 'W19S23',
      target: 'W19S23'
    }
  }, {
    count: 1,
    name_prefix: 'miner_W19S23_',
    body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'miner',
      type: 'swarm',
      target: 'W19S23',
      find: FIND_SOURCES_ACTIVE,
      resource: RESOURCE_ENERGY
    }
  }, {
    count: 6,
    name_prefix: 'hauler_W19S23_',
    body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
    memory: {
      role: 'hauler',
      type: 'swarm',
      work_place: 'W18S25',
      energy_room: 'W19S23',
      link_id: '5bd9c6fffd47502f5f46418c'
    }
  }, {
    count: 10,
    name_prefix: 'wd_',
    body: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK],
    memory: {
      role: 'destroyer',
      squad: 'walls_destruction'
    }
  }]
};