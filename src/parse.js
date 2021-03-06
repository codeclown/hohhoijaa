const parse = markdown => {
  const lines = markdown.split(/\n/g);
  let insideCodeBlock = false;
  return lines.reduce((headings, line, index) => {
    if (line.startsWith('```')) {
      insideCodeBlock = !insideCodeBlock;
    } else if (!insideCodeBlock && line[0] === '#') {
      const match = line.match(/^(#+) ?(.*)/);
      headings.push({
        level: match[1].length,
        text: match[2]
      });
    } else if (!insideCodeBlock && index > 0 && (line.startsWith('--') || line.startsWith('=='))) {
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
