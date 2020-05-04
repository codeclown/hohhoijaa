const render = headings => {
  return headings.map(({ level, text }) => `${'  '.repeat(level - 1)}- ${text}`).join('\n');
};

module.exports = render;
