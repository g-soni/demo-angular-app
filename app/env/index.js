module.exports = function(app) {
  var env;
  if (IS_PRODUCTION) {
    env = require('./prod.js');
  } else {
    env = require('./dev.js');
  }
  
  if (app) {
    app.constant('InspectionConfig', env);
  }

  return env;
}
