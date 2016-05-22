angular.module('swen303.product', ['swen303.services.product', 'swen303.services.specifications', 'swen303.factory.cart', 'swen303.factory.user', 'ngNotify'])

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

				AvailableInstances: ['ProductService', '$stateParams', function(ProductService, $stateParams) {
					return ProductService.getAvailable($stateParams.id).then(function(payload) {
						return payload;
					});
				}],

				AllInstances: ['ProductService', '$stateParams', function(ProductService, $stateParams) {
					return ProductService.getInstances($stateParams.id).then(function(payload) {
						return payload;
					});
				}],

				Specifications: ['SpecificationService', '$stateParams', function(SpecificationService, $stateParams) {
					return SpecificationService.getSpecifications($stateParams.id).then(function(payload) {
						return payload;
					});
				}]
			}
		});
	})

	.controller('ProductController', function($state, $scope, ProductService, SpecificationService, Product, Specifications, AvailableInstances, AllInstances, UserFactory, usercartFactory, ngNotify) {
		var rentProduct = JSON.parse(JSON.stringify(Product)); //make a deep clone of product first
		rentProduct.quantity = 1; //quantity to buy
		rentProduct.rentdays = rentProduct.minrentdays; //set rent days to minimum rent days
		$scope.product = rentProduct;
		$scope.specs = Specifications;
		$scope.compareProduct = null;
		$scope.compareSpecs = null;
		$scope.searchResult = null;
		$scope.fullCompareTable = null;
		$scope.quantity = AvailableInstances.length;
		$scope.quantityTotal = AllInstances.length;

		//Create Comparison table of specifications
		repopulateCompareTable = function(){
			if($scope.compareProduct==null){
				$scope.fullCompareTable = null;
				return;
			}
			//Get specs of new item
			SpecificationService.getSpecifications($scope.compareProduct.pid).then(function(payload) {
				$scope.compareSpecs = payload;
				var fullCompTable = [];
				//Compare this products specs with other product
				for(i = 0; i < $scope.specs.length; i++){
					var value="-";
					for(j = 0; j < $scope.compareSpecs.length; j++){
						if($scope.specs[i].name == $scope.compareSpecs[j].name){
							value = $scope.compareSpecs[j].value;
						}
					}
					fullCompTable.push({"name":$scope.specs[i].name, "value_1":$scope.specs[i].value, "value_2":value});
				}

				//Add extra specs from other product
				for(i = 0; i < $scope.compareSpecs.length; i++){
					var matchFound=false;
					for(j = 0; j < $scope.specs.length; j++){
						if($scope.compareSpecs[i].name == $scope.specs[j].name){
							matchFound = true;
						}
					}
					if(!matchFound){
						fullCompTable.push({"name":$scope.compareSpecs[i].name, "value_1":"-", "value_2":$scope.compareSpecs[i].value});
					}
				}
				$scope.fullCompareTable = fullCompTable;
			});

		}


		$scope.searchTerm = '';

//Search items
		$scope.search = function() {
			if (!$scope.searchTerm) {
				$scope.compareProduct = null;
				repopulateCompareTable();
			} else {
				//Search in all
				ProductService.search($scope.searchTerm, 0).then(function(payload) {
					if(payload[0]!=null){
						//Get first item found
						$scope.compareProduct = payload[0];
						//repop table
						repopulateCompareTable();
					}
				});
			}
		};


		$scope.addToCart = function() {
			usercartFactory.addToPurchase($scope.product);
			$state.go("cart");
		};

		$scope.rent = function() {
			console.log(rentProduct);
			rentProduct.maxQuantity = $scope.quantity;
            usercartFactory.addMultipleToRent(rentProduct, rentProduct.quantity);
            ngNotify.set(rentProduct.name + " has been added to your cart", 'success');
            $state.go("cart");
		};
		
	})

;
