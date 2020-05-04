const assert = require('assert');
const fs = require('fs');
const hohhoijaa = require('../src/hohhoijaa');

const fixture = fs.readFileSync('./fixture.md', 'utf8');

const headings = parse(fixture);
