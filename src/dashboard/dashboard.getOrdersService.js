(function(){
	'use strict';

	angular.module('app.dashboard')
	.factory('getOrdersService', getOrdersService);

	getOrdersService.$inject = ['$http', 'api'];

	function getOrdersService($http, api){
		var gos = {
			getOrdersList: getOrdersList
		};

		return gos;
		
		function getOrdersList(){
			console.log("in getOrdersList service")
			return $http.get(api + '/orders').then(function(result){
				return result.data;
			});
		};
	}
})();