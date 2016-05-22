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
				Orders: ['UserFactory', function(UserFactory) {
					return UserFactory.getOrders().then(function(payload) {
						return payload;
					});
				}]
			}
		});
	})

	.controller('OrdersController', function($scope, Orders) {
		$scope.orders = Orders;

		for (var i = 0 ; i < $scope.orders.length ; i++) {
			$scope.orders[i].purchaseable = ((new Date().getTime() - (new Date($scope.orders[i].clocked_out).getTime())) / (1000 * 60 * 60 * 24)) > $scope.orders[i].mindaystobuy;
			$scope.orders[i].purchasePrice = $scope.orders[i].purchaseprice - ((new Date().getTime() - (new Date($scope.orders[i].clocked_out).getTime())) / (1000 * 60 * 60 * 24) * $scope.orders[i].rentalpricepd);
		}
	})

;
