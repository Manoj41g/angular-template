(function(){
	'use strict';

	angular.module('app.dashboard')
	.factory('getInstrumentsService', getInstrumentsService);

	getInstrumentsService.$inject = ['$http', 'api'];

	function getInstrumentsService($http, api){
		var gis = {
			getInstruments: getInstruments 
		};

		return gis;

		function getInstruments(){
			console.log("in getInstrumentsService");
			return $http.get(api + "/instruments").then(function(data){
				console.log(data.data);
				return data.data;
			});
		};
	}
})();