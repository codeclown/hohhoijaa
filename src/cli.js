const fs = require('fs');
const util = require('util');
const findTemplateSpot = require('./findTemplateSpot');
const parse = require('./parse');
const render = require('./render');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

if (require.main === module) {
  const args = process.argv.slice(2).reduce((args, item) => {
    if (item.startsWith('--')) {
      args.flags.push(item);
    } else {
      args.files.push(item);
    }
    return args;
  }, { flags: [], files: [] });

  if (!args.flags.length && !args.files.length) {
    console.error('Usage: hohhoijaa [--check] file1 file2 ...');
    process.exit(1);
  }

  if (!args.files.length) {
    console.error('Expected 1 or more files');
    process.exit(1);
  }

  if (args.flags.includes('--check')) {
    console.error('Running in CI mode (--check)...');
  }

  let exitCode = 0;

  Promise
    .all(args.files.map(file => {
      return readFile(file, 'utf8')
        .then(contents => {
          const templateSpots = findTemplateSpot(contents);
          if (!templateSpots.length) {
            console.error(`File ${JSON.stringify(file)} does not contain template string, skipping`);
            return;
          }
          const templateSpot = templateSpots[0];
          const previous = contents.slice(templateSpot.start, templateSpot.end);
          const headings = parse(contents);
          const tableOfContents = render(headings);
          const insert = `\n\n${tableOfContents}\n\n`;
          if (insert === previous) {
            console.error(`File ${JSON.stringify(file)} already up-to-date`);
            return;
          }
          if (args.flags.includes('--check')) {
            console.error(`FAIL File ${JSON.stringify(file)} is not up-to-date`);
            exitCode = 1;
            return;
          }
          const updated = `${contents.substring(0, templateSpot.start)}${insert}${contents.substring(templateSpot.end)}`;
          return writeFile(file, updated)
            .then(() => {
              console.error(`File ${JSON.stringify(file)} changed`);
            });
        })
        .then(() => {
          process.exit(exitCode);
        })
        .catch(error => {
          if (error.code === 'ENOENT') {
            if (args.flags.includes('--check')) {
              console.error(`FAIL File ${JSON.stringify(file)} not found`);
              exitCode = 1;
            } else {
              console.error(`File ${JSON.stringify(file)} not found, skipping`);
            }
            return;
          }
          throw error;
        })
    }))
    .catch(error => {
      console.error(`Process failed with error: ${error.message}`);
      process.exit(1);
    });
}
