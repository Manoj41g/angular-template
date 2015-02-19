/*
#   Author : Manoj Pandey
#   Date : 17th Feb 2015
#   Description : Create-Order service
*/
(function(){
	'uese strict';

	angular.module('app.dashboard')
	.factory('createOrderService',createOrderService);

	createOrderService.$inject = ['$http', 'api'];

	function createOrderService($http, api){
		var cos = {
			createOrder: createOrder
		};

		return cos;
		
		function createOrder(formData){
	        $http.post(api + '/orders', formData)
	        .success(function(data, status){
	            console.log("Order created");
	        })
	        .catch(function(message){
	        	exception.catcher("XHR Failed for createOrder")(message);
	        });
		}

		
    }

})();