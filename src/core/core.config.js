/*
#   Author : Manoj Pandey
#   Date : 17th Feb 2015
#   Description : Routing
*/
(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(handleRoute);

    handleRoute.$inject = ['$urlRouterProvider', '$stateProvider'];

    // Routing through application
    function handleRoute($urlRouterProvider,  $stateProvider){
        $urlRouterProvider.otherwise('/login');

        $stateProvider

        // Load login module
        .state(
            'login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller: 'loginController as lc'
        })

        // Load dashboard module
        .state(
            'dashboard',{
                url: '/dashboard',
                templateUrl: 'dashboard/dashboard.html',
                controller: 'DashboardController as dc'
        })
    }

})();
