# NYC Geosearch Acceptance Tests

This repository contains all of the NYC Geosearch API acceptance tests, which are automated tests used to identify
improvements and regressions between various versions of the API and the underlying data.

[More about Geosearch](https://github.com/NYCPlanning/labs-geosearch-dockerfiles)

## Requirements

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with NPM)

## Local development

- Clone this repo: `git clone git@github.com:NYCPlanning/labs-geosearch-acceptance-tests.git`
- Navigate to the project directory: `cd labs-geosearch-acceptance-tests`
- Install Dependencies: `npm install`
- Set the environment variable `PELIAS_CONFIG` to the path at which the file can be found: `export PELIAS_CONFIG=config.json`

## Usage

default to running all tests against production

```bash
$ npm test
```

## Test Case Files

For a full description of what can go in tests, see the
[pelias-fuzzy-tester](https://github.com/pelias/fuzzy-tester) documentation.
