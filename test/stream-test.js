/*
 * wikimedia-stream - steam-test.js (test)
 *
 * Test if the stream actually work
 * Copyright (C) 2015 Valentin Berclaz
 * <http://www.valentinberclaz.com/>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
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
