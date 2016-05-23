angular.module('swen303.buyproduct', [])

	.config(function($stateProvider) {
		$stateProvider.state('buyproduct', {
			url: '/buyproduct?:price',
			views: {
				"main": {
					templateUrl: 'buyproduct/payment.html',
					controller: 'BuyProductController'
				}
			}
		});
	})

	.controller('BuyProductController', function($scope, $state, $stateParams, UserFactory) {
		if (!UserFactory.user) {
			$state.go('register', { redirectstate: 'buyproduct' });
		} else {
			$scope.user = UserFactory.user;
		}

		$scope.total = $stateParams.price;
	})

;
