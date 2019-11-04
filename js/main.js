(function ($, angular) {
	"use strict";
	
	var testData = [
		{
			ProductName: "Test Product 1",
			QuantityPerUnit: "100 units per box",
			UnitPrice: "49.75",
			Discontinued: false
		},
		{
			ProductName: "Test Product 2",
			QuantityPerUnit: "20 cases per pallet",
			UnitPrice: "168.77",
			Discontinued: false
		},
		{
			ProductName: "Test Product 3",
			QuantityPerUnit: "20 per box, 20 boxes",
			UnitPrice: "4953.75",
			Discontinued: false
		},
		{
			ProductName: "Test Product 4",
			QuantityPerUnit: "65 individually wrapped",
			UnitPrice: "112.50",
			Discontinued: true
		}
	];

	var odataUrl = "/Northwind/V3/Northwind/Northwind.svc/";

	function helloController($scope, $http, $timeout, $filter) {
		$scope.productList = [];
		
		$scope.orderAmount = "";
		$scope.orderAlert = "";
		
		$scope.productFilter = undefined;
		$scope.productFilterCount = function() {
			var	count = $filter('filter')($scope.productList, $scope.productFilter).length;
			return count;
		};
		
		var promise = $http.get(odataUrl + "Products").then(
			function onSuccess(response) {
				$scope.productList = response.data.value;
			},
			function onError(error){
				alert("An error occurred\n\n" + angular.toJson(error));
			}
		);
		
		$scope.selectedProduct = {};
		$scope.selectProduct = function( product ) {
			$scope.selectedProduct = product;
			$scope.orderAmount = "";
			$scope.orderAlert = false;
			$('#product-detail').modal("show");
		};
		
		$scope.orderItem = function() {
			$scope.orderAlert = {
				type: 'success',
				message: $scope.orderAmount + " units of " + $scope.selectedProduct.ProductName + " have been ordered."
			};
			
			$('#product-detail').modal("hide");
			$('#order-alert-box').slideDown("slow");
			$timeout(function(){
				$('#order-alert-box').slideUp("slow", function(){
					$timeout(function(){
						$scope.orderAlert = false;
					});
				});
			}, 4000);
		};
	}

	function discontinuedFilter() {
		return function(input, mode) {
			if (mode == "css") {
				return input ? "discontinued" : "available";	
			}
			return input ? "Discontinued" : "Available";
		};
	}

	angular
		.module("helloWorld",[])
		.controller('helloController', helloController)
		.filter('discontinued', discontinuedFilter);

})(jQuery, angular);