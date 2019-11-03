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

	function helloController($scope, $http) {
		$scope.productList = testData;
	}


	angular
		.module("helloWorld",[])
		.controller('helloController', helloController);

})(jQuery, angular);