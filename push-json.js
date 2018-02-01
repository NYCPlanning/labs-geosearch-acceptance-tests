var SlackWebhook = require('slack-webhook');
var AWS = require('aws-sdk');

require('dotenv').config();

var spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
var s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

var slack = new SlackWebhook(process.env.SLACK_WEBHOOK_URL, {
  defaults: {
    username: 'GeoSearch Import Bot',
    channel: '#labs-geocoder-api',
    icon_emoji: ':robot_face:'
  }
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
  regressions: failures,
};


var params = {
    Body: JSON.stringify(status),
    Bucket: 'planninglabs',
    Key: 'geosearch-acceptance-tests/status.json',
    ContentType: 'application/json',
    ACL: 'public-read',
};



s3.putObject(params, function(err) {
    if (err) {
      console.log(err, err.stack);
    } else {
      var url = 'https://planninglabs.nyc3.digitaloceanspaces.com/geosearch-acceptance-tests/failures.json';
      slack.send(`GeoSearch Tests Complete! <${url}|View JSON>`);
    }
});
