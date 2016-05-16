angular.module('swen303.factory.user', [])

	.factory('UserFactory', function($http) {

		var user = {};

		// Check for already signed in user
		try {
			user = JSON.parse(localStorage.getItem('user'));
			// If there is a partial user object for some reason, get rid of it
			if (!user.user_id) {
				user = {};
			}
		} catch(error) {}

		return {

			register: function(user) {
				return $http.post('/api/users', user).then(function(payload) {
					user = payload;

					try {
						localStorage.setItem('user', JSON.stringify(user));
					} catch (error) {}

					return { success: true };
				});
			},

			signin: function(details) {
				return $http.post('/api/users/' + details.username, details).then(function(payload) {
					user = payload;

					try {
						localStorage.setItem('user', JSON.stringify(user));
					} catch (error) {}

					return { success: true };
				});
			},

			signout: function() {
				user = {};
				localStorage.clear();
			}

		};
	})

;
