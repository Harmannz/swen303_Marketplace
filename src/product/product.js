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
				Specifications: ['SpecsService', '$stateParams', function(SpecsService, $stateParams) {
					return SpecsService.getSpecifications($stateParams.id).then(function(payload) {
						return payload;
					});
				}]
			}
		});
	})

	.controller('ProductController', function($scope, Product, Specifications) {
		$scope.product = Product;
		$scope.specifications = Specifications;
	})

;
