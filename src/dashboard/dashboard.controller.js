(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope','getOrdersService', 'createOrderService', 'deleteOrdersService', 'getInstrumentsService', 'sessionService', '$location'];

    function DashboardController($scope, getOrdersService, createOrderService, deleteOrdersService, getInstrumentsService, sessionService, $location) {
        var dc = this;
        console.log("Dashboard controller ..LOADED");
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
        var socket = io.connect('http://localhost:8080');


        init();

        function init(){
            checkSession();
            getOrderRequest();
            getInstrumentsRequest();
        }

        function checkSession(){
            console.log("in checksession");
        //    console.log(JSON.parse(sessionService.getSession()));
            dc.username = JSON.parse(sessionService.getSession());
          //  console.log(dc.username);
            if(null == dc.username){
                deleteSession();
            }
            else{
                return "";
            }
        }

        // GET Orders created
        function getOrderRequest(){
         //   console.log("in getOrderRequest--");
            getOrdersService.getOrdersList().then(function(data){
            //    console.log("in getOrderList--");
                dc.listOfOrder = data;  // todo after creating order from app
           //     console.log(dc.listOfOrder);
            })
        }

       
        // POST to Create Order
        function createOrderRequest(){
         //   console.log("in create order request" + dc.numberOfTrade);
            if(dc.numberOfTrade !== null && dc.numberOfTrade > 0){
                dc.numberOfTrade -= 1;
                dc.createOrderData = createData(); 
                createOrderService.createOrder(dc.createOrderData);
                createOrderRequest();
            }
            else{
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
        //    console.log("in resetNumber OfTrade");
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
        //        console.log("in get Instruments Request")
        //        console.log(data);
            })
        }

        // SOCKET
        socket.on('orderCreatedEvent', function (data) {
            $scope.$apply(function() {
                dc.listOfOrder.push(data);
            });

        });
        socket.on('placementCreatedEvent', function (data) {
            $scope.$apply(function() {
                angular.forEach(dc.listOfOrder, function (order,index) {
                if (order.id == data.orderId) {
                    dc.listOfOrder[index].quantityPlaced = data.quantityPlaced;
                    dc.listOfOrder[index].status = data.status;
                 }
              });
            });
        });
        socket.on('executionCreatedEvent', function (data) {
            $scope.$apply(function() {
                angular.forEach(dc.listOfOrder, function (order,index) {
                if (order.id == data.orderId) { 
                    dc.listOfOrder[index].quantityExecuted = data.quantityExecuted;
                    dc.listOfOrder[index].executionPrice = data.executionPrice;
                    dc.listOfOrder[index].status = data.status;
                 }
              });
            });
        });
        socket.on('allOrdersDeletedEvent', function (data) {
            $scope.$apply(function() {
                dc.listOfOrder = [];
            });
        });

    }
})();
