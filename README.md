# pkg-diff
[![Build Status](https://travis-ci.org/Nipher/pkg-diff.svg?branch=master)](https://travis-ci.org/Nipher/pkg-diff)
[![NPM version](https://badge-me.herokuapp.com/api/npm/pkg-diff.png)](http://badges.enytc.com/for/npm/pkg-diff)
[![Coverage Status](https://coveralls.io/repos/github/Nipher/pkg-diff/badge.svg?branch=master)](https://coveralls.io/github/Nipher/pkg-diff?branch=master)

Outputs the diff between two package.json dependencies

![](example.gif)

```bash
$ npm i -g pkg-diff
$ pkg-diff path/to/project-1 path/to/project-2
```

If you want to ignore any dependency type you can use `--ignore`.

```bash
$ pkg-diff --ignore=peer,optional path/to/project-1 path/to/project-2
```

## License

MIT License
