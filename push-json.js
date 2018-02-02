var AWS = require('aws-sdk');
var moment = require('moment');

require('dotenv').config();

var spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
var s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

var normalizedPath = require('path').join(__dirname, 'failures');

var failures = [];

require('fs').readdirSync(normalizedPath)
  .forEach(function(file) {
    var failure = require('./failures/' + file);
    failures.push(failure);
  });

var status = {
  status: failures.length > 0 ? 'failed' : 'passed',
  time: new Date(),
  rowCount: parseInt(process.env.ROWCOUNT) || null,
  regressions: failures,
};

console.log(status);

var params = {
    Body: JSON.stringify(status),
    Bucket: 'planninglabs',
    Key: 'geosearch-acceptance-tests/status.json',
    ContentType: 'application/json',
    ACL: 'public-read',
};

s3.putObject(params, function(err) {
  if (err) { console.log(err, err.stack); }
});

// add a timestamped status object for archival
params.Key = `geosearch-acceptance-tests/status_${moment().toISOString()}.json`;
s3.putObject(params, function(err) {
  if (err) { console.log(err, err.stack); }
});
