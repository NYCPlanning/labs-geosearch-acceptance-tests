/* -----

This script turns a text file into JSON test cases.

It expects:
- A filepath argument
- Each line of the source file is a distinct test case string
- Each test should pass against the autocomplete endpoint

----- */

var fs = require('fs');

const filepath = process.argv[2];

var array = fs.readFileSync(filepath).toString().split('\n');

const outputObject = {
  name: '',
  endpoint: 'autocomplete',
  priorityThresh: 5,
  tests: [],
};

array.forEach((address, i) => {
  const test = {
    id: i.toString(),
    status: 'pass',
    in: {
      text: address
    },
      expected: {
        properties: [
          {
            layer: 'address'
          }
        ]
      }
    };

    outputObject.tests.push(test);
});

const outputFilepath = filepath.replace('.txt', '.json');

fs.writeFileSync(outputFilepath, JSON.stringify(outputObject, null, 2));
