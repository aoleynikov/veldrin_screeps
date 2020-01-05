const NETWORK = {
  'W5S52': ['W5S53']
}

const unit_types = ["nanny"]
const unit_blueprints = () => {
  let result = {}
  unit_types.map((k) => {
    return [k, require('swarm.' + k)]
  }).forEach((el) => {
    result[el[0]] = el[1]
  })
  return result
}

const room_creeps = (core, room) => {
  unit_types.map((type) => {
    let blueprint = unit_blueprints()[type]
    return {
      count: blueprint.count(core, room),
      name_prefix: blueprint.name_prefix(core, room),
      memory: blueprint.memory(core, room),
      body: blueprint.body(core)
    }
  })
}

const creeps = () => {
  new Map(Object.entries(NETWORK).map((rooms) => {
    [ 
      rooms[0], 
      [rooms[0]].concat(rooms[1]).map((room) => {
        return room_creeps(rooms[0], room)
      })
    ]
  }))
}

module.exports = {
  creeps: creeps
}