/*
#   Author : Manoj Pandey
#   Date : 18th Feb 2015
#   Description : Session service
*/
(function(){
	'use strict';

	angular.module('app.core')
	.factory('sessionService',sessionService);

	function sessionService(){
		var ss = {
			createSession: createSession,
			getSession: getSession,
			destroySession: destroySession
		};

		return ss;

		// CREATE user session
		function createSession(loginUser){
			sessionStorage.setItem("user", loginUser);
		}

		// GET user session
		function getSession(){
			return sessionStorage.getItem("user");
		}

		// DESTROY user session
		function destroySession(){
			sessionStorage.removeItem("user");
		}
	}
})();