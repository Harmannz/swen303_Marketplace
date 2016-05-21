angular.module('swen303.profile.info', [])

	.config(function($stateProvider) {
		$stateProvider.state('profile.info', {
			url: '',
			views: {
				"profile": {
					templateUrl: 'profile/info/info.html',
					controller: 'InfoController'
				}
			},
			resolve: {
				User: ['UserFactory', function(UserFactory) {
					return UserFactory.user;
				}]
			}
		})
	})

	.controller('InfoController', function($scope, User, UserFactory) {
		$scope.user = User;

		$scope.submit = function() {
			UserFactory.updateDetails($scope.user).then(function(payload) {
				if (payload.success) {
					//
				}
			});
		};
	})

;
