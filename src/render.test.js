const assert = require('assert');
const render = require('./render');

describe('render', () => {
  it('renders empty array', () => {
    assert.deepStrictEqual(render([]), '');
  });

  it('renders headings', () => {
    assert.deepStrictEqual(render([
      { level: 1, text: 'Heading levels' },
      { level: 2, text: 'Heading' },
      { level: 3, text: 'Sub-heading' },
      { level: 4, text: 'Sub-sub-heading' },
      { level: 2, text: 'Asd' },
      { level: 1, text: 'Major heading' },
      { level: 2, text: 'Foobar' },
      { level: 2, text: '`code`' },
      { level: 2, text: 'Hey there' },
      { level: 3, text: 'Yay' }
    ]), `
- [Heading levels](#heading-levels)
  - [Heading](#heading)
    - [Sub-heading](#sub-heading)
      - [Sub-sub-heading](#sub-sub-heading)
  - [Asd](#asd)
- [Major heading](#major-heading)
  - [Foobar](#foobar)
  - [\`code\`](#code)
  - [Hey there](#hey-there)
    - [Yay](#yay)
    `.trim());
  });

  it('renders duplicate headings with index', () => {
    assert.deepStrictEqual(render([
      { level: 1, text: 'Heading' },
      { level: 2, text: 'Heading' },
      { level: 3, text: 'Heading' },
      { level: 2, text: 'Heading' },
    ]), `
- [Heading](#heading)
  - [Heading](#heading-1)
    - [Heading](#heading-2)
  - [Heading](#heading-3)
    `.trim());
  });
});
