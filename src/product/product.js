angular.module('swen303.product', ['swen303.services.product', 'swen303.services.specifications'])

	.config(function($stateProvider) {
		$stateProvider.state('product', {
			url: '/product/:id',
			views: {
				"main": {
					templateUrl: 'product/product.html',
					controller: 'ProductController'
				}
			},
			resolve: {
				Product: ['ProductService', '$stateParams', function(ProductService, $stateParams) {
					return ProductService.getProduct($stateParams.id).then(function(payload) {
						return payload;
					});
				}],
				Specifications: ['SpecificationService', '$stateParams', function(SpecificationService, $stateParams) {
					return SpecificationService.getSpecifications($stateParams.id).then(function(payload) {
						return payload;
					});
				}],
				CompareSpecifications: ['SpecificationService', '$stateParams', function(SpecificationService, $stateParams) {
					return SpecificationService.getSpecifications(2).then(function(payload) {
						return payload;
					});
				}]
			}
		});
	})

	.controller('ProductController', function($scope, Product, Specifications, CompareSpecifications, usercartFactory) {
		$scope.product = Product;
		$scope.specs = Specifications;
		$scope.compareSpecs = CompareSpecifications;

		//Create Comparison table of specifications
		var fullCompTable = [];
		fullCompTable.push({"name":"Item", "value_1":Product.name, "value_2":"TEST COMPARE ITEM"})
		//Compare this products specs with other product
		for(i = 0; i < Specifications.length; i++){
			var value="-";
			for(j = 0; j < CompareSpecifications.length; j++){
				if(Specifications[i].name == CompareSpecifications[j].name){
					value = CompareSpecifications[j].value;
				}
			}
			fullCompTable.push({"name":Specifications[i].name, "value_1":Specifications[i].value, "value_2":value});
		}

		//Add extra specs from other product
		for(i = 0; i < CompareSpecifications.length; i++){
			var matchFound=false;
			for(j = 0; j < Specifications.length; j++){
				if(CompareSpecifications[i].name == Specifications[j].name){
					matchFound = true;
				}
			}
			if(!matchFound){
				fullCompTable.push({"name":Specifications[i].name, "value_1":"-", "value_2":CompareSpecifications[i].value});
			}
		}

		$scope.addToCart = function() {
			usercartFactory.addToPurchase($scope.product);
		};

		$scope.rent = function() {
			$scope.product.rentdays = $scope.product.minrentdays;
			usercartFactory.addToRent($scope.product);
		};


		$scope.fullCompareTable = fullCompTable;
		console.log(fullCompTable);
	})

;
