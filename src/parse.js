const parse = markdown => {
  const lines = markdown.split(/\n/g);
  return lines.reduce((headings, line, index) => {
    if (line[0] === '#') {
      const match = line.match(/^(#+) ?(.*)/);
      headings.push({
        level: match[1].length,
        text: match[2]
      });
    } else if (index > 0 && (line.startsWith('--') || line.startsWith('=='))) {
      const previousLine = lines[index - 1].trim();
      if (previousLine !== '') {
        headings.push({
          level: line.startsWith('-') ? 1 : 2,
          text: previousLine
        });
      }
    }
    return headings;
  }, []);
};

module.exports = parse;
