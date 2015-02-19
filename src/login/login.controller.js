/*
#	Author : Manoj Pandey
#	Date : 16th Feb 2015
#	Description : Login controller
*/
(function(){
	'use strict';

	angular.module('app.login')
	.controller('loginController', loginController)

	loginController.$inject = ['getUsersService', 'sessionService', '$location'];

	function loginController(getUsersService, sessionService, $location){
		var lc = this;
		
		lc.listOfUser = null;
		lc.user = null;
		lc.sessionPresent = null;
		lc.getUsers = getUsers;
		lc.createSession = createSession;
		lc.checkSession = checkSession;

		init();

		function init(){
			checkSession(); 
			getUsers()
		}

		// Checking current user's session exist or not
		function checkSession(){
			console.log("checknig session");

			// Call to service to get session data
			lc.sessionPresent = sessionService.getSession(); 
			
			// If session present then redirect to dashboard
			if(null != lc.sessionPresent){
				$location.url("/dashboard");
			}
			else{
				return "";
			}
		}

		// Call to service to get list of users
		function getUsers(){
			getUsersService.getUserList().then(function(data){
				lc.listOfUser = data;
			})
			.catch(function(message){
				exception.catcher('getUserList Service cannot succeed')(message);
			});
		}

		// Create new session on login
		function createSession(){			
			if(lc.user != null){
				sessionService.createSession(JSON.stringify(lc.user));
				$location.url("/dashboard");
			}
			
		}


	}

})();