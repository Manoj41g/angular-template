/*
#   Author : Manoj Pandey
#   Date : 17th Feb 2015
#   Description : GET-instruments service
*/
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
			return $http.get(api + "/instruments")
			.then(getInstrumentsComplete)
			.catch(function(message){
				exception.catcher("XHR Failed for getInstruments")(message);
			});

			function getInstrumentsComplete(data){
				return data.data;
			}
		};
	}
})();