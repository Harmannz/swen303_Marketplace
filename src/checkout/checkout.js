angular.module('swen303.cart', [])

	.config(function($stateProvider) {
		$stateProvider.state('cart', {
			url: '/cart',
			views: {
				"main": {
					templateUrl: 'checkout/checkout.html',
					controller: 'CartController'
				}
			}
		});
	})

	.controller('CartController', function($scope) {
		
	})

;
