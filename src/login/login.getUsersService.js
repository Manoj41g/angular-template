(function(){
	'use strict';

	angular.module('app.login')
	.factory('getUsersService', getUsersService);

	getUsersService.$inject = ['$http', 'api']

	function getUsersService($http, api){
		var fo = {
			getUserList: getUserList
		};

		return fo;
		
		function getUserList(){
			return $http.get(api + "/users").then(function(result){
				return result.data;
			});
		};

	}

})();