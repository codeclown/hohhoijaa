const START_TAG = '<!-- hohhoijaa -->';
const END_TAG = '<!-- /hohhoijaa -->';

const findTemplateSpot = markdown => {
  const lines = markdown.split(/\n/g);
  let position = 0;
  let start = null;
  const ranges = [];
  lines.forEach(line => {
    const startIndex = line.indexOf(START_TAG);
    if (!start && startIndex == 0) {
      start = position + startIndex + START_TAG.length;
    }
    if (start) {
      const endIndex = line.indexOf(END_TAG);
      if (endIndex >= 0) {
        end = position + endIndex;
        ranges.push({ start, end: position + endIndex });
        start = null;
      }
    }
    position += line.length + 1;
  });
  return ranges;
};

module.exports = findTemplateSpot;
