/*
#   Author : Manoj Pandey
#   Date : 18th Feb 2015
#   Description : Socket.io service
*/
(function(){
	'use strict';

	angular.module('app.core')
	.factory('socketIoService', socketIoService);

	socketIoService.$inject = ['socketFactory'];

	function socketIoService(socketFactory){
		return socketFactory({
		   ioSocket: io.connect('http://localhost:8080')
		  });
	}
})()

