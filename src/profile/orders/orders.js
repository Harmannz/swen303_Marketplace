angular.module('swen303.profile.orders', [])

	.config(function($stateProvider) {
		$stateProvider.state('profile.orders', {
			views: {
				"profile": {
					templateUrl: 'profile/orders/orders.html',
					controller: 'OrdersController'
				}
			},
			resolve: {
				Orders: [function() {
					// TODO load orders
					return null;
				}]
			}
		});
	})

	.controller('OrdersController', function($scope, Orders) {
		$scope.orders = Orders;
	})

;
