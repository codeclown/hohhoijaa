const render = headings => {
  return headings.map(({ level, text }) => {
    const indent = '  '.repeat(level - 1);
    const slug = text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
    return `${indent}- [${text}](#${slug})`;
  }).join('\n');
};

module.exports = render;
