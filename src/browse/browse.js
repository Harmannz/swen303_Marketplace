angular.module('swen303.browse', ['swen303.services.product', 'swen303.services.category', 'swen303.factory.cart'])

    .config(function($stateProvider) {
        $stateProvider.state('browse', {
            url: '/browse/:cid',
            views: {
                "main": {
                    templateUrl: 'browse/browse.html',
                    controller: 'BrowseController'
                }
            },
            resolve: {
                Products: ['ProductService', '$stateParams', function(ProductService, $stateParams) {
                    return ProductService.getFromCategory($stateParams.cid).then(function(payload) {
                        return payload;
                    });
                }],


                Category: ['CategoryService', '$stateParams', function(CategoryService, $stateParams) {
                    return CategoryService.get($stateParams.cid).then(function(payload) {
                        return payload;
                    });
                }]
            }
        });
    })

    .controller('BrowseController', function($scope, Products, Category, ProductService, usercartFactory) {
        $scope.products = Products;
        $scope.category = Category;

		$scope.searchTerm = '';

		$scope.search = function() {
			if (!$scope.searchTerm) {
				ProductService.getFromCategory($scope.category.cid).then(function(payload) {
					$scope.products = payload;
				});
			} else {
				ProductService.search($scope.searchTerm, $scope.category.cid).then(function(payload) {
					$scope.products = payload;
				});
			}
		};

        $scope.addToCart = function(product) {
            usercartFactory.addToPurchase(product);
        };

        $scope.rent = function(product) {
            product.rentdays = product.minrentdays;
            usercartFactory.addToRent(product);
        };

    })

;
