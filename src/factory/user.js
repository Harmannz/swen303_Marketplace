angular.module('swen303.factory.user', [])

	.factory('UserFactory', function($http) {

		var user = undefined;

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
						localStorage.setItem('user', JSON.stringify(Auth.user));
					} catch (error) {}

					return { success: true };
				});
			},

			signin: function(details) {
				return $http.post('/api/users/' + details.username, details).then(function(payload) {
					Auth.user = payload.data;

					try {
						localStorage.setItem('user', JSON.stringify(Auth.user));
					} catch (error) {}

					return { success: true };
				});
			},

			signout: function() {
				Auth.user = undefined;
				try {
					localStorage.clear();
				} catch (error) {}
			},

			updateDetails: function(data) {
				return $http.post('/api/users/' + Auth.user.uid + '/update', data).then(function(payload) {
					if (payload.data.success) {
						Auth.user = data;
						localStorage.setItem('user', JSON.stringify(Auth.user));
					}

					return payload.data;
				});
			},

			checkForNotifications: function() {
				return $http.get('/api/users/' + Auth.user.uid + '/notifications').then(function(payload) {
					return payload.data;
				});
			},

			getHistory: function() {
				return $http.get('/api/users/' + Auth.user.uid + '/history').then(function(payload) {
					return payload.data;
				});
			},

			getOrders: function() {
				return $http.get('/api/users/' + Auth.user.uid + '/rented').then(function(payload) {
					return payload.data;
				});
			},

			getSellingItems: function() {
				return $http.get('/api/users/' + Auth.user.uid + '/selling').then(function(payload) {
					return payload.data;
				});
			}

		};

		return Auth;
	})

;
