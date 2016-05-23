angular.module('swen303.profile.rented', [])

	.config(function($stateProvider) {
		$stateProvider.state('profile.rented', {
			views: {
				"profile": {
					templateUrl: 'profile/rented/rented.html',
					controller: 'RentedController'
				}
			},
			resolve: {
				Listed: ['UserFactory', function(UserFactory) {
					return UserFactory.getSellingItems().then(function(payload) {
						return payload;
					});
				}]
			}
		});
	})

	.controller('RentedController', function($scope, Listed) {
		$scope.listed = Listed;
	})

;
