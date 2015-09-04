# acceptance tests

This repository contains all of the Pelias API "acceptance" tests, which are automated tests used to identify
improvements and regressions between various versions of the API and the underlying data. Since it's
difficult/impossible to manually verify whether things have begun silently failing (eg, a certain query stopped
returning the right results) after a data or search logic change, the acceptance tests should provide us with a
shotgun overview of the status of any Pelias instance.

## prerequisites

You will need to have `npm` version `2.0` or higher installed.

## Usage

```
npm test
npm test -- -e prod
npm test -- -e stage -t dev
```

## Test Case Files

For a full description of what can go in tests, see the
[pelias-fuzzy-tester](https://github.com/pelias/fuzzy-tester) documentation
