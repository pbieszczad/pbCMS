'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', function($scope) {

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }])
  .controller('PagesCtrl',['$scope','$log', 'PagesFactory', function($scope, $log, PagesFactory) {
  	PagesFactory.getPages().then(
  		function(response){
  			$scope.allPages = response.data;
  		},
  		function(err){
  			$log.error(err);
  		}
  	)
  }])
.controller('PagesAddEditCtrl',['$scope','$log', 'PagesFactory', '$routeParams', '$location', 'flashMessageService','$filter', function($scope, $log, PagesFactory, $routeParams, $location, flashMessageService, $filter) {
  $scope.pageContent = {};
  $scope.pageContent._id = $routeParams.id;
  $scope.heading = "Add a New Page";


if ($scope.pageContent._id !== 0) {
          $scope.heading = "Update Page";
          PagesFactory.getAdminPageContent($scope.pageContent._id).then(
              function(response) {
                $scope.pageContent = response.data;
                $log.info($scope.pageContent);
              },
              function(err) {
                $log.error(err);
              });
        }  
    $scope.updateURL=function(){
      $scope.pageContent.url=$filter('formatURL')($scope.pageContent.title);
    }
  $scope.savePage = function(){
    PagesFactory.savePage($scope.pageContent).then(
      function(){
        flashMessageService.setMessage("Page Saved Successfully");
        $location.path('/pages')
      },
      function(){
        $log.error('error saving data');
      }
    );
  };
}]);
