(function(){
	'uese strict';

	angular.module('app.dashboard')
	.factory('createOrderService',createOrderService);

	createOrderService.$inject = ['$http', 'api']

	function createOrderService($http, api){
		var cos = {
			createOrder: createOrder
		};

		return cos;
		
		function createOrder(formData){
			console.log("in createOrder service");
			// data for POST of Create order
		/*	var formData = {
				    "side": "Buy",
	                "symbol": "ext32",  //// instruments
	                "quantity": 1000,
	                "limitPrice": 666.24,
	                "traderId": "DT"   //// from user session
			}*/

	        $http.post(api + '/orders', formData).success(function(data, status){
	            console.log("post completed");
	        })
		}

		
    }

})();