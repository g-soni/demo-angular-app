var angular = require('angular');
var env = require('./env')();
var router = require('angular-new-router');
var resource = require('angular-resource');
var resource = require('ng-infinite-scroll');
require('bootstrap/dist/css/bootstrap.css');
require('angular-ui-bootstrap/dist/ui-bootstrap-tpls.js');


var app = angular.module('inspection', [
  'ui.bootstrap',
   'ngNewRouter',
   'ngResource',
   'infinite-scroll'
]);

require('./env')(app);
require('./dashboard')(app);


app.controller('AppController', ['$router', function($router) {
    $router.config([
       { path: '/', redirectTo: '/dashboard' },
       { path: '/dashboard', component: 'dashboard' }
    ]);
}]);

app.config(['$componentLoaderProvider', function ($componentLoaderProvider) {
 $componentLoaderProvider.setTemplateMapping(function (name) {
   // name is component name
   return name + '/' + name + '.html';
 });
}]);
