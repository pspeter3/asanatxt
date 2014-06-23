var _ = require('highland');
var request = _.wrapCallback(require('request'));

exports.URL_ROOT = "https://app.asana.com/api/1.0";

exports.get = function(apiKey, path, query) {
  if (!query) {
    query = {}
  }
  return request({
    url: exports.URL_ROOT + path,
    auth: {
      user: apiKey,
      pass: ''
    },
    qs: query,
    json: true
  }).map(function(res) {
    return res.body.data;
  });
};
