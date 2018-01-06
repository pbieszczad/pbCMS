'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngFileUpload'])

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

.controller('PagesAddEditCtrl',['$scope','$log','Upload','$window','$timeout', 'PagesFactory', '$routeParams', '$location', 'flashMessageService','$filter', function($scope, $log,Upload,$window,$timeout, PagesFactory, $routeParams, $location, flashMessageService, $filter) {
  $scope.pageContent = {};
  $scope.pageContent._id = $routeParams.id;
  $scope.heading = "Add a New Page";
  $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: 'http://localhost:3000/upload/page',
      data: {file: Upload.rename(file, $scope.pageContent.featuredImage)},
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }



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
    $scope.passFilename=function(){
      $scope.pageContent.featuredImage = Date.now() + '-' + $scope.picFile.name  ;
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
