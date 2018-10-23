/* 
WARNING! If price of supporting the swarm per 300 ticks is more than energy 
income available to harvesters, the swarm doesn't function as intended.


If you have a storage, it provides an easy way to monitor the economy balance.
For RCL <= 3, don't get greedy.
*/
module.exports = {
  rooms: ["W31S51", "W32S51", "W31S52", "W32S52"],
  templates: [{
    count: 1,
    body: [CLAIM, MOVE],
    memory: {
      role: 'claimer',
      target: 'W32N29'
    }
  }]
};