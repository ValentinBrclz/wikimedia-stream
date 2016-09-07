wikimedia-stream
======
Stream contributions and actions of any Wikimedia's project that has an IRC channel with Node.js

[![NPM version](https://badge.fury.io/js/wikimedia-stream.png)](http://badge.fury.io/js/wikimedia-stream)
[![Build Status](https://api.travis-ci.org/ValentinBrclz/wikimedia-stream.png)](http://travis-ci.org/ValentinBrclz/wikimedia-stream)
[![Dependency Status](https://img.shields.io/david/ValentinBrclz/wikimedia-stream.svg?style=flat)](https://david-dm.org/ValentinBrclz/wikimedia-stream#info=Dependencies)
[![devDependency Status](https://img.shields.io/david/dev/ValentinBrclz/wikimedia-stream.svg?style=flat)](https://david-dm.org/ValentinBrclz/wikimedia-stream#info=devDependencies)
[![License](https://img.shields.io/badge/license-GPLv3-blue.svg?style=flat)](http://opensource.org/licenses/GPL-3.0)

[![NPM](https://nodei.co/npm/wikimedia-stream.png?downloads=true&downloadRank=true)](https://nodei.co/npm/wikimedia-stream/)

## Installation
``` bash
  $ npm install wikimedia-stream
```

Or [download the latest stable version](https://github.com/ValentinBrclz/wikimedia-stream/releases) on GitHub.

## Usage

Basic example:
```javascript
'use strict';

var WikimediaStream = require('../lib/wikimedia-stream');

var ws = new WikimediaStream({});

try {
	ws.on("data", function (data) {
	  // Do something with the returned data
	});
}
catch(err)
{
	console.log(err);
}
```
See [examples/](https://github.com/ValentinBrclz/wikimedia-stream/blob/master/examples/) for more examples

### The returned object
```javascript
var data = {
	// Project, usually the subdomain without .org
	project: "en.wikipedia",
	// Title of the page, with namespace
	page: "Wikipedia:Main Page",
	// Flags of the edit (M = minor, N = new page, B = Bot, ...)
	flags: "M",
	// Diff or url with oldid of the action
	url: "https://en.wikipedia.org/w/index.php?title=Main_Page&diff=664887982&oldid=664887812",
	// Username of the performer of the action
	user: "SlimVirgin",
	// Size modification
	size: "-32",
	// Summary or comment about the action
	comment: "Reverted edits by [[User:SlimVirgin|SlimVirgin]]...",
}
```

## Licensing
* License: GNU General Public Licence (3.0)
* Author: [Valentin Berclaz](https://github.com/ValentinBrclz)
* Inspired by [wikipedia-stream](https://github.com/arscan/wikipedia-stream)
