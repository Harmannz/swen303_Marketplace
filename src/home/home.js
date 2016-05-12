angular.module('swen303.home', ['swen303.services.product'])

    .config(function($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                "main": {
                    templateUrl: 'home/home.html',
                    controller: 'HomeController'
                }
            },
            resolve: {
                Products: ['ProductService', function(ProductService) {
                    return ProductService.getFeaturedProducts().then(function(payload) {
                        return payload;
                    });
                }]
            }
        });
    })

    .controller('HomeController', function($scope, Products) {
        $scope.products = Products;
    })

;
