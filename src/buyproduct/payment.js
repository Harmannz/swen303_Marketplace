angular.module('swen303.buyproduct', [])

	.config(function($stateProvider) {
		$stateProvider.state('buyproduct', {
			url: '/buyproduct?:price&:id',
			views: {
				"main": {
					templateUrl: 'buyproduct/payment.html',
					controller: 'BuyProductController'
				}
			},
			resolve: {

			}
		});
	})

	.controller('BuyProductController', function($scope, $state, $stateParams, UserFactory, ProductService) {
		if (!UserFactory.user) {
			$state.go('register', { redirectstate: 'profile.orders' });
		} else {
			$scope.user = UserFactory.user;
		}

		$scope.total = $stateParams.price;

		$scope.submitForm = function() {
			ProductService.buyProduct($stateParams.id).then(function() {
				$state.go('profile.orders');
			});
		};
	})

;
