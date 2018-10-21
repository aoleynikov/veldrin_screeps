/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to harvesters, the swarm doesn't function as intended.


If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/

module.exports = {
    'W31S51': [{
            count: 3,
            role: 'miner',
            body: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE],
            type: 'swarm'
        },
        {
            count: 3,
            role: 'upgrader',
            body: [WORK, MOVE, WORK, MOVE, WORK, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
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
            role: 'builder',
            body: [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE],
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
            role: 'repairer',
            body: [WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
            type: 'swarm'
        },
        {
            count: 2,
            role: 'builder',
            body: [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, MOVE, CARRY, MOVE],
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