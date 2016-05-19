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
				History: [function() {
					// TODO load history
					return null;
				}]
			}
		});
	})

	.controller('HistoryController', function($scope, History) {
		$scope.history = History;
	})

;
