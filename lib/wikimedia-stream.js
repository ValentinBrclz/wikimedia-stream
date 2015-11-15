/*
 * wikimedia-stream
 *
 * Stream contributions and actions of any Wikimedia's project that has
 * an IRC channel with Node.js
 * Copyright (C) 2015 Valentin Berclaz
 * <http://www.valentinberclaz.com/>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; version 2 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
'use strict';

var stream = require('stream'),
	util = require('util'),
	irc = require('irc'),
	ircClient;

// Create a message object
var parseMessage = function (message, channel) {
	var object = {};

	var matches = message.match(
		/^\[\[(.+?)]] (.+?)? (https?:\/\/[^ ]+?)? \* (.+?) \* (\(([+-][0-9]+?)\))? ?(.+?)?$/
	);

	object.project = channel.substring(1);
	object.page = matches[1];
	object.flags = matches[2];
	object.url = matches[3];
	object.user = matches[4];
	object.size = matches[6];
	object.comment = matches[7];

	for (var k in object)
		if (!object[k]) delete object[k];

	return object;
};

/*
 * Constructor based on wikipedia-stream (C) 2014 Rob Scanlon (MIT license)
 * Modified and relicensed under the GNU General Public License as
 * published by the Free Software Foundation; version 2 of the License.
 */
function WikimediaStream(_opts) {
	var _this = this;
	var opts = {};

	var defaults = {
		server: "irc.wikimedia.org",
		user: "wikimedia-stream-node",
		channels: ["#fr.wikipedia"]
	};

	for (var o in defaults) {
		if (_opts === undefined || !_opts[o]) {
			opts[o] = defaults[o];
		} else {
			opts[o] = _opts[o];
		}
	}

	ircClient = new irc.Client(opts.server, opts.user, {
		channels: opts.channels,
		stripColors: true,
		realName: 'http://brclz.ch/wm-stream'
	});

	ircClient.on('error', function (error) {
		throw new Error("IRC Error: " + error);
	});

	ircClient.on('message', function (from, to, message) {
		_this.push(parseMessage(message, to));
	});

	stream.Readable.call(this, {objectMode: true});
}

util.inherits(WikimediaStream, stream.Readable);

WikimediaStream.prototype._read = function () {
};
WikimediaStream.prototype._quit = function () {
	ircClient.disconnect();
};

module.exports = WikimediaStream;
