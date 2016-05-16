angular.module('swen303.register', [])

	.config(function($stateProvider) {
		$stateProvider.state('register', {
			url: '/register?:redirectstate',
			views: {
				"main": {
					templateUrl: 'register/register.html',
					controller: 'RegisterController'
				}
			}
		});
	})

	.controller('RegisterController', function($scope, $state, $stateParams, UserFactory) {
		$scope.register = function() {
			if ($scope.user.password !== $scope.confirm_password) {
				return;
			}

			UserFactory.register($scope.user).then(function(result) {
				if (result.success) {
					if ($stateParams.redirectstate) {
						try {
							$state.go(redirectstate);
						} catch (Error) {
							$state.go('home');
						}
					} else {
						$state.go('home');
					}
				}
			});
		};

		$scope.signin = function() {
			UserFactory.signin($scope.signinDetails).then(function(result) {
				if (result.success) {
					if ($stateParams.redirectstate) {
						try {
							$state.go(redirectstate);
						} catch (Error) {
							$state.go('home');
						}
					} else {
						$state.go('home');
					}
				}
			});
		};
	})

;
