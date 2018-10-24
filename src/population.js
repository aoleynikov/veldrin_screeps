/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to harvesters, the swarm doesn't function as intended.


If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/

module.exports = {
  rooms: ["W32N28", "W31N28", "W33N28", "W32N29"],
  templates: [{
      count: 1,
      body: [CLAIM, CLAIM, MOVE, MOVE],
      memory: {
        role: 'claimer',
        target: 'W32N29',
        work_place: 'W32N29',
        type: 'swarm'
      }
    },
    {
      count: 1,
      body: [CLAIM, CLAIM, MOVE, MOVE],
      memory: {
        role: 'claimer',
        target: 'W31N28',
        work_place: 'W31N28',
        type: 'swarm'
      }
    },
    {
      count: 1,
      body: [CLAIM, CLAIM, MOVE, MOVE],
      memory: {
        role: 'claimer',
        target: 'W31N28',
        work_place: 'W31N28',
        type: 'swarm'
      }
    }
  ]
};