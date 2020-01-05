const NETWORK = {
  'W5S52': ['W5S53']
}

const unit_types = ["nanny"]
const unit_blueprints = unit_types.reduce((r, k) => r[k] = require('swarm.' + k), {})

const room_creeps = (core, room) => {
  unit_types.map((type) => {
    let blueprint = unit_blueprints[type]
    return {
      count: blueprint.count(core, room),
      name_prefix: blueprint.name_prefix(core, room),
      memory: blueprint.memory(core, room),
      body: blueprint.body(core)
    }
  })
}

const creeps = () => {
  rooms = populated_rooms()
  Object.entries(NETWORK).reduce((result, rooms) => {
    result[rooms[0]] = [rooms[0]].concat(rooms[1]).map((room) => {
      return room_creeps(rooms[0], room)
    })
  }, {})
}

module.exports = {
  creeps: creeps
}