module.exports = {
    'W31S51': [{
            count: 2,
            role: 'upgrader',
            body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
            type: 'swarm'
        },
        {
            count: 2,
            role: 'repairer',
            body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
            type: 'swarm'
        },
        {
            count: 3,
            role: 'miner',
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
            type: 'swarm'
        },
        {
            count: 1,
            role: 'builder',
            body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE],
            type: 'swarm'
        },
        {
            count: 3,
            role: 'hauler',
            body: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
            type: 'swarm',
            energy_room: 'W32S51'
        },
        {
            count: 3,
            role: 'hauler',
            body: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
            type: 'swarm',
            energy_room: 'W31S52'
        },
        {
            count: 4,
            role: 'hauler',
            body: [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY],
            type: 'swarm',
            energy_room: 'W32S52'
        }
    ],
    'W32S51': [{
            count: 1,
            role: 'claimer',
            body: [CLAIM, CLAIM, MOVE, MOVE],
            type: 'swarm'
        },
        {
            count: 2,
            role: 'builder',
            body: [WORK, MOVE, CARRY, MOVE, WORK, CARRY, MOVE],
            type: 'swarm'
        },
        {
            count: 2,
            role: 'repairer',
            body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
            type: 'swarm'
        },
        {
            count: 3,
            role: 'miner',
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
            type: 'swarm'
        }
    ],
    'W31S52': [{
            count: 1,
            role: 'claimer',
            body: [CLAIM, CLAIM, MOVE, MOVE],
            type: 'swarm'
        },
        {
            count: 2,
            role: 'builder',
            body: [WORK, MOVE, CARRY, WORK, MOVE, CARRY, MOVE],
            type: 'swarm'
        },
        {
            count: 2,
            role: 'repairer',
            body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
            type: 'swarm'
        },
        {
            count: 3,
            role: 'miner',
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
            type: 'swarm'
        }
    ],
    'W32S52': [{
            count: 1,
            role: 'claimer',
            body: [CLAIM, CLAIM, MOVE, MOVE],
            type: 'swarm'
        },
        {
            count: 2,
            role: 'builder',
            body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE],
            type: 'swarm'
        },
        {
            count: 3,
            role: 'miner',
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
            type: 'swarm'
        },
        {
            count: 2,
            role: 'repairer',
            body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
            type: 'swarm'
        }
    ]
};