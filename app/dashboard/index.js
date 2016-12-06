var angular = require('angular');

module.exports = function(dashboard) {
  require('./dashboard.scss');
  require('./dashboard.service')(dashboard);
  require('./dashboard.controller')(dashboard);
  var template = require('./dashboard.html');
}
