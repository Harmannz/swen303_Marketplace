angular.module('swen303.profile.history', [])

	.config(function($stateProvider) {
		$stateProvider.state('profile.history', {
			views: {
				"profile": {
					templateUrl: 'profile/history/history.html',
					controller: 'HistoryController'
				}
			},
			resolve: {
				History: ['UserFactory', function(UserFactory) {
					return UserFactory.getHistory().then(function(payload) {
						return payload;
					});
				}]
			}
		});
	})

	.controller('HistoryController', function($scope, History) {
		$scope.history = History;
	})

;
