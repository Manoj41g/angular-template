(function(){
	'use strict';

	angular.module('app.dashboard')
	.factory('deleteOrdersService', deleteOrdersService);

	deleteOrdersService.$inject = ['$http', 'api'];

	function deleteOrdersService($http, api){
		var dos = {
			deleteOrders: deleteOrders
		};

		return dos;
		
		function deleteOrders(){
			console.log("in delet orders service");
			return $http.delete(api + "/orders").success(function(data, status){
				console.log("orders deleted successfully");
			})
		}
	}
})();