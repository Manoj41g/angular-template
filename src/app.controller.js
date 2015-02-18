(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

//    AppController.$inject = ['$state', 'routerHelper'];

    /* @ngInject */
    function AppController() {
        var vm = this;   
    }
})();
