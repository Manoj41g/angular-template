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
			return $http.get(api + '/orders')
			.then(getOrdersListComplete)
			.catch(function(message){
				exception.catcher("XHR Failed for getInstruments")(message);
			})

			function getOrdersListComplete(result){
				return result.data;
			}
		};
	}
})();