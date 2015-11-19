wikimedia-stream
======
Stream contributions and actions of any Wikimedia's project that has an IRC channel with Node.js

[![NPM version](https://badge.fury.io/js/wikimedia-stream.png)](http://badge.fury.io/js/wikimedia-stream)
[![Build Status](https://api.travis-ci.org/ValentinBrclz/wikimedia-stream.png)](http://travis-ci.org/ValentinBrclz/wikimedia-stream)
[![Dependency Status](https://img.shields.io/david/ValentinBrclz/wikimedia-stream.svg?style=flat)](https://david-dm.org/ValentinBrclz/wikimedia-stream#info=Dependencies)
[![devDependency Status](https://img.shields.io/david/dev/ValentinBrclz/wikimedia-stream.svg?style=flat)](https://david-dm.org/ValentinBrclz/wikimedia-stream#info=devDependencies)
[![License](https://img.shields.io/badge/license-GPLv2-blue.svg?style=flat)](http://opensource.org/licenses/GPL-2.0)

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

var ws = new WikimediaStream();

try {
	ws.on("data", function (data) {
	  // Do something with the data
	  // data contains project, page, flags, url, user, size, comment
	});
}
catch(err)
{
	console.log(err);
}
```
See [examples/](https://github.com/ValentinBrclz/wikimedia-stream/blob/master/examples/) for more examples

### The "data" object
```javascript
var data = {
	project: "en.wikipedia", // Project, usually the subdomain without .org
	page: "Wikipedia:Main Page", // Title of the page, with namespace
	flags: "m", // Flags of the edit (m = minor, N = new page, B = Bot, ...)
	url: "https://en.wikipedia.org/w/index.php?title=Main_Page&diff=664887982&oldid=664887812", // Diff or url with oldid of the action
	user: "SlimVirgin", // Username of the performer of the action
	size: "-32", // Size modification
	comment: "Reverted edits by [[User:SlimVirgin|SlimVirgin]]...", // Summary or comment about the action
}
```

## Licensing
* License: GNU General Public Licence (2.0)
* Author: [Valentin Berclaz](https://github.com/ValentinBrclz)
