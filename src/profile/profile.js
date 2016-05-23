angular.module('swen303.profile', ['swen303.profile.info', 'swen303.profile.orders', 'swen303.profile.history', 'swen303.profile.rented'])

	.config(function($stateProvider) {
		$stateProvider.state('profile', {
			abstract: true,
			url: '/profile',
			views: {
				"main": {
					templateUrl: 'profile/profile.html',
					controller: 'ProfileController'
				}
			}
		});
	})

	.controller('ProfileController', function($scope, $state, UserFactory) {
		$scope.state = 'profile.info';

		$scope.changeState = function(state) {
			$state.go(state);
			$scope.state = state;
		};

		if (!UserFactory.user) {
			$state.go('register', { redirectstate: 'profile.info' });
		} else {
			$scope.name = UserFactory.user.firstname;
		}
	})

;
