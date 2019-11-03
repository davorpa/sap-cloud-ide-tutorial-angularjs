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

	function helloController($scope, $http) {
		$scope.productList = [];
		
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
			$('#product-detail').modal("show");
		};
	}


	angular
		.module("helloWorld",[])
		.controller('helloController', helloController);

})(jQuery, angular);