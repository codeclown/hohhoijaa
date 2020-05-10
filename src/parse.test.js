const assert = require('assert');
const parse = require('./parse');

describe('parse', () => {
  it('does not parse other contents', () => {
    assert.deepStrictEqual(parse(`
> This is a fixture to test heading levels

<!-- toc -->

> quote

foobar

\`\`\`
some code
\`\`\`
    `), []);
  });

  it('does not parse inside code blocks', () => {
    assert.deepStrictEqual(parse(`
foobar

\`\`\`bash
npm install --save helppo
# or
yarn add helppo
\`\`\`

foobar
    `), []);
  });

  it('parses headings', () => {
    assert.deepStrictEqual(parse(`
# Heading levels

> This is a fixture to test heading levels

<!-- toc -->

## Heading

This is an h1 heading

### Sub-heading

This is an h2 heading

#### Sub-sub-heading

This is an h3 heading

## Heading

This is an h1 heading

Major heading
-----------

This is an h2 heading

## Sub-sub-heading

This is an h3 heading

## \`code\`

This is an h1 heading

Sub-heading
===========

This is an h2 heading

### Sub-sub-heading

This is an h3 heading

    `), [
      { level: 1, text: 'Heading levels' },
      { level: 2, text: 'Heading' },
      { level: 3, text: 'Sub-heading' },
      { level: 4, text: 'Sub-sub-heading' },
      { level: 2, text: 'Heading' },
      { level: 1, text: 'Major heading' },
      { level: 2, text: 'Sub-sub-heading' },
      { level: 2, text: '`code`' },
      { level: 2, text: 'Sub-heading' },
      { level: 3, text: 'Sub-sub-heading' }
    ]);
  });
});
