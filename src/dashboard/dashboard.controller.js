/*
#   Author : Manoj Pandey
#   Date : 17th Feb 2015
#   Description : Dashboard controller
*/
(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope','getOrdersService', 'createOrderService', 'deleteOrdersService', 'getInstrumentsService', 'sessionService', '$location', 'socketIoService'];

    function DashboardController($scope, getOrdersService, createOrderService, deleteOrdersService, getInstrumentsService, sessionService, $location, socketIoService) {
        var dc = this;

        dc.numberOfTrade = null;
        dc.listOfOrder = null;
        dc.username = null;
        dc.instruments = null;
        dc.createOrderData = null;

        dc.createOrderRequest = createOrderRequest;
        dc.getOrderRequest = getOrderRequest;
        dc.deleteOrderRequest = deleteOrderRequest;
        dc.resetNumberOfTrade = resetNumberOfTrade;
        dc.deleteSession = deleteSession;
        dc.checkSession = checkSession;
        dc.getInstrumentsRequest = getInstrumentsRequest; 
    //    var socket = io.connect('http://localhost:8080');


        init();

        function init(){
            checkSession();
            getOrderRequest();
            getInstrumentsRequest();
        }

        function checkSession(){
            // get data stored in session storage
            dc.username = JSON.parse(sessionService.getSession());
            if(null == dc.username){
                deleteSession();
            }
            else{
                return "";
            }
        }

        // GET Orders created
        function getOrderRequest(){
            getOrdersService.getOrdersList().then(function(data){
                dc.listOfOrder = data;
            })
        }

       
        // POST to Create Order
        function createOrderRequest(){
            if(dc.numberOfTrade !== null && dc.numberOfTrade > 0){
                dc.numberOfTrade -= 1;
                dc.createOrderData = createData(); 
                createOrderService.createOrder(dc.createOrderData);
                createOrderRequest();
            }
            else{
                // Close create order modal
                $('#createOrderModal').modal('toggle');
                return "";
            }
        };

        // Create data for create-order POST request
        function createData(){
            var formData = {
                side : ((Math.random()*10)<5?"Buy":"Sell") ,
                symbol: dc.instruments[parseInt(Math.random()*10)].symbol,
                quantity: parseInt(Math.random()*10000),
                limitPrice :  Math.round((Math.random()*1000) * 100) / 100,
                traderId : dc.username.id
            };
            return formData;
        }

        // Reset the number given in create-order popup
        function resetNumberOfTrade(){
            dc.numberOfTrade = null;
            $('#createOrderModal').modal('toggle');
        }

        // DELETE Orders request
        function deleteOrderRequest(){
            deleteOrdersService.deleteOrders();
        }

        // Signout - destroy session
        function deleteSession(){ 
        // call to service to remove current session
           sessionService.destroySession();
           $location.url("/login");
        }

        // call to service to get instruments list
        function getInstrumentsRequest(){
            getInstrumentsService.getInstruments().then(function(data){
                dc.instruments = data;
            })
        }

        // SOCKET
        socketIoService.on('orderCreatedEvent', orderCreatedEvent);

        function orderCreatedEvent(data) {
            dc.listOfOrder.push(data);
        }
        
        socketIoService.on('placementCreatedEvent', placementCreatedEvent);

        function placementCreatedEvent(data) {
                angular.forEach(dc.listOfOrder, function (order,index) {
                if (order.id == data.orderId) {
                    dc.listOfOrder[index].quantityPlaced = data.quantityPlaced;
                    dc.listOfOrder[index].status = data.status;
                 }
              });
        }

        socketIoService.on('executionCreatedEvent', executionCreatedEvent);
        function executionCreatedEvent(data) {
                angular.forEach(dc.listOfOrder, function (order,index) {
                if (order.id == data.orderId) { 
                    dc.listOfOrder[index].quantityExecuted = data.quantityExecuted;
                    dc.listOfOrder[index].executionPrice = data.executionPrice;
                    dc.listOfOrder[index].status = data.status;
                 }
            });
        }

        socketIoService.on('allOrdersDeletedEvent', allOrdersDeletedEvent);
        function allOrdersDeletedEvent(data) {
                dc.listOfOrder = [];
        }
    }
})();
