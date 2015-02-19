/*
#   Author : Manoj Pandey
#   Date : 17th Feb 2015
#   Description : Delete-Order service
*/
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
			return $http.delete(api + "/orders")
			.success(function(data, status){
				console.log("orders deleted successfully");
			})
			.catch(function(message){
				exception.catcher("XHR Failed for deleteOrders")(message);
			});
		}
	}
})();