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

## Usage

Default to running all tests against production:

```bash
$ npm test
```

Save failing results as JSON files in `/failures/` (one per failing test):

```bash
$ npm test -- -o json
```

## Test Cases

For a full description of what can go in tests, see the
[pelias-fuzzy-tester](https://github.com/pelias/fuzzy-tester) documentation.

**Test Creation Script**  
To create an autocomplete test from a set of terms:

- Create a source `.txt` file in `scripts/`
- Each line of the source file should be a distinct test case string that's expected to pass against the autocomplete endpoint with a valid `layer: 'address'` property
- Run `node scripts/create-json.js [filepath]` to generate the `.json` file
- Edit the `name` parameter in the generated test file
- Manually move the file into `test_cases/`
