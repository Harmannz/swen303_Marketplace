angular.module('swen303.cart', [])

	.config(function($stateProvider) {
		$stateProvider.state('cart', {
			url: '/cart/{id:int}',
			views: {
				"main": {
					templateUrl: 'src/checkout/checkout.html',
					controller: 'CartController'
				}
			}
		});
	})

	.controller('CartController', function($scope, $stateParams) {
		$scope.userId = $stateParams.id;
	})

;
