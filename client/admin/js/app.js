'use strict';


// Declare app level module which depends on filters, and services
var myAppModule = angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ui.tinymce',
  'message.flash',
  'flow'
]).
config(['$routeProvider','$locationProvider', function($routeProvider) {
  $routeProvider.when('/pages', {
  	templateUrl: 'pages/pages.html',
  	controller: 'PagesCtrl'
  });
  $routeProvider.when('/pages/add-edit-page/:id', {
    templateUrl: 'pages/add-edit-page.html',
    controller: 'PagesAddEditCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/'});
  // $locationProvider.html5Mode(true);
}]);
myAppModule.controller('TinyMceController', function($scope) {


  $scope.tinymceOptions = {
    plugins: 'link image code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
  };
});
