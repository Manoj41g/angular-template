/*
#	Author : Manoj Pandey
#	Date : 16th Feb 2015
#	Description : Login get user Service
*/
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
			return $http.get(api + "/users").then(getUserListComplete) 
			.catch(function(message) {
                    exception.catcher('XHR Failed for getUserList')(message);
                });

			function getUserListComplete(result){
				return result.data;
			}
		};

	}

})();