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
      { level: 2, text: 'Heading' },
      { level: 1, text: 'Major heading' },
      { level: 2, text: 'Sub-sub-heading' },
      { level: 2, text: '`code`' },
      { level: 2, text: 'Sub-heading' },
      { level: 3, text: 'Sub-sub-heading' }
    ]), `
- Heading levels
  - Heading
    - Sub-heading
      - Sub-sub-heading
  - Heading
- Major heading
  - Sub-sub-heading
  - \`code\`
  - Sub-heading
    - Sub-sub-heading
    `.trim());
  });
});
