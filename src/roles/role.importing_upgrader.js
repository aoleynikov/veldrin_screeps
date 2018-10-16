var importer = require('role.importer');
var upgrader = require('role.upgrader');

module.exports = {
	perform: function(creep) {
		importer.perform(creep, upgrader.perform);
	}
}