const render = headings => {
  const indexes = {};
  return headings.map(({ level, text }) => {
    const indent = '  '.repeat(level - 1);
    const slug = text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
    const index = indexes[slug] !== undefined ? indexes[slug] + 1 : 0;
    indexes[slug] = index;
    return `${indent}- [${text}](#${slug}${index === 0 ? '' : `-${index}`})`;
  }).join('\n');
};

module.exports = render;
