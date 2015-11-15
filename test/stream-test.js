'use strict';

var vows = require('vows'),
	assert = require('assert'),
	WikimediaStream = require('../lib/wikimedia-stream');

var vm;

vows.describe('wikimedia-stream class').addBatch({
	'Stream functionability': {
		topic: function() {
			vm = new WikimediaStream({
				server: "irc.wikimedia.org",
				user: "wikimedia-stream-node",
				channels: ["#fr.wikipedia"]
			});
			return vm;
		},
		'connected to wikimedia stream': function(stream) {
			stream.on("data", function (data) {
				assert.isObject(data);
			});
		},
		'reading from a channel': function(stream) {
			stream.on("data", function (data) {
				assert.equal(data.project, 'fr.wikipedia');
			});
		},
		'reading an action and parsing it': function(stream) {
			stream.on("data", function (data) {
				stream._quit();
				assert.isString(data.page);
				assert.isString(data.user);
			});
		}
	}
}).export(module);
