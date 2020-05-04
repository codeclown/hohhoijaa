# hohhoijaa

> Generate Table of Contents in your Markdown-files

## Table of Contents

<!-- hohhoijaa -->

- hohhoijaa
  - Table of Contents
  - Why
  - Installation
  - Usage
    - Add template tag
    - CLI
  - License

<!-- /hohhoijaa -->

## Why

Yes, there [are](https://www.npmjs.com/package/gen-md-toc) [tons](https://www.npmjs.com/package/markdown-toc) [of](https://www.npmjs.com/package/toc-md) [scripts](https://www.npmjs.com/package/md-toc) like this already.

This script is for those of us who want the following:

- Support multiple files out-of-the-box, i.e. `gen-toc-md *.md`
- For CI use, `--check` to validate existing TOCs but not write anything
- No external dependencies, just simple text matching (see [`test/`](test/), it works fine)

## Installation

```bash
npm install --save-dev hohhoijaa
```

## Usage

### Add template tag

Add `<!-- hohhoijaa --><!-- /hohhoijaa -->` to each markdown file where you want the generated Table of Contents to be inserted.

Files without this template tag will be unaffected.

### CLI

Basic usage:

```bash
hohhoijaa README.md
```

Bash wildcards work:

```bash
hohhoijaa *.md
```

Validate existing TOCs (if any file needs updating, will exit with 1; otherwise with 0):

```bash
hohhoijaa --check *.md
```

## License

MIT
