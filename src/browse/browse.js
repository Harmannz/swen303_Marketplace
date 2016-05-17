angular.module('swen303.browse', ['swen303.services.product', 'swen303.services.category'])

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

    .controller('BrowseController', function($scope, Products, Category, ProductService) {
        $scope.products = Products;
        $scope.category = Category;

		$scope.search = '';

		$scope.$watch('search', function() {
			/*ProductService.search($scope.search).then(function(payload) {
				$scope.products = payload;
			});*/
		});
    })

;
