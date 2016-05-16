angular.module('swen303.factory.user', [])

	.factory('UserFactory', function($http) {

		var user = {};

		// Check for already signed in user
		try {
			user = JSON.parse(localStorage.getItem('user'));
			// If there is a partial user object for some reason, get rid of it
			if (!user.uid) {
				user = {};
			}
		} catch(error) {}

		var Auth = {

			user: user,

			register: function(user) {
				return $http.post('/api/users', user).then(function(payload) {
					Auth.user = payload.data;

					try {
						localStorage.setItem('user', JSON.stringify(user));
					} catch (error) {}

					return { success: true };
				});
			},

			signin: function(details) {
				return $http.post('/api/users/' + details.username, details).then(function(payload) {
					Auth.user = payload.data;

					try {
						localStorage.setItem('user', JSON.stringify(user));
					} catch (error) {}

					return { success: true };
				});
			},

			signout: function() {
				Auth.user = {};
				localStorage.clear();
			}

		};

		return Auth;
	})

;
