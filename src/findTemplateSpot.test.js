const assert = require('assert');
const findTemplateSpot = require('./findTemplateSpot');

describe('findTemplateSpot', () => {
  it('returns an empty array if there are no template tags', () => {
    assert.deepStrictEqual(findTemplateSpot(`
foobar
    `), []);
  });

  it('returns an empty array if template tag is invalid', () => {
    assert.deepStrictEqual(findTemplateSpot(`
<!-- hohhoijaa -->
    `), []);
    assert.deepStrictEqual(findTemplateSpot(`
<!-- hohhoijaa -->
<!-- hohhoijaa -->
    `), []);
    assert.deepStrictEqual(findTemplateSpot(`
<!-- /hohhoijaa -->
    `), []);
    assert.deepStrictEqual(findTemplateSpot(`
<!-- /hohhoijaa -->
<!-- /hohhoijaa -->
    `), []);
    assert.deepStrictEqual(findTemplateSpot(`
<!-- /hohhoijaa -->
<!-- hohhoijaa -->
    `), []);
  });

  it('returns an empty array if template tag is not in the beginning of the line', () => {
    assert.deepStrictEqual(findTemplateSpot(`
 <!-- hohhoijaa -->
<!-- /hohhoijaa -->
    `), []);
  });

  it('finds one-line template tag', () => {
    assert.deepStrictEqual(findTemplateSpot(`
foobar

<!-- hohhoijaa --><!-- /hohhoijaa -->

foobar
    `), [
      { start: 27, end: 27 }
    ]);
  });

  it('finds one-line template tag with content', () => {
    assert.deepStrictEqual(findTemplateSpot(`
foobar

<!-- hohhoijaa -->asd<!-- /hohhoijaa -->

foobar
    `), [
      { start: 27, end: 30 }
    ]);
  });

  it('finds two-line template tag', () => {
    assert.deepStrictEqual(findTemplateSpot(`
foobar

<!-- hohhoijaa -->
<!-- /hohhoijaa -->

foobar
    `), [
      { start: 27, end: 28 }
    ]);
  });

  it('finds two-line template tag with content', () => {
    assert.deepStrictEqual(findTemplateSpot(`
foobar

<!-- hohhoijaa -->asd
<!-- /hohhoijaa -->

foobar
    `), [
      { start: 27, end: 31 }
    ]);
  });

  it('finds multi-line template tag', () => {
    assert.deepStrictEqual(findTemplateSpot(`
foobar

<!-- hohhoijaa -->

<!-- /hohhoijaa -->

foobar
    `), [
      { start: 27, end: 29 }
    ]);
  });

  it('finds multi-line template tag with content', () => {
    assert.deepStrictEqual(findTemplateSpot(`
foobar

<!-- hohhoijaa -->
asd
<!-- /hohhoijaa -->

foobar
    `), [
      { start: 27, end: 32 }
    ]);
  });
});
