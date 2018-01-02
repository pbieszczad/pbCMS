'use strict';

/* Services */

angular.module('myApp.services', [])
	.factory('PagesFactory', ['$http',
		function($http){
			return{
				getPages: function(){
					return $http.get('http://localhost:3000/api/pages');
				},
				savePage: function(pageData) {
			        var id = pageData._id;

			        if (id === 0 || id === '0') {
			          return $http.post('/api/pages/add', pageData);
			        } else {
			          return $http.post('/api/pages/update', pageData);
			        }
			      },
				deletePage: function(id){
					return $http.post('http://localhost:3000/api/pages/delete/' + id);
				},
				getAdminPageContent: function(id) {
			        return $http.get('http://localhost:3000/api/pages/admin-details/' + id);
			    },
			    getPageContent: function(url) {
			        return $http.get('http://localhost:3000/api/pages/details/' + url);
			    }
			}
		}
	]);
