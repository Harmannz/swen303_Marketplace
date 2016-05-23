// Angular is modular - this is the main module, tied to the index.html file
// where it says ng-app="swen303"
// The array is the dependencies
// Each page should have it's own module,
// which this main module should depend upon.
// Thats why it has swen303.home as a dependency
// Also, ui.router is a dependency to make the routing system work
angular.module('swen303', [
    'ui.router',
    'templates-app',
    'swen303.home',
    'swen303.cart',
    'swen303.cart.payment',
    'swen303.product',
    'swen303.listproduct',
    'swen303.browse',
    'swen303.register',
    'swen303.profile',
    'swen303.buyproduct',
    'swen303.services.category',
    'swen303.factory.cart',
    'swen303.factory.user',
    'ngNotify'
])

    // Config just specifies configuration parameters for the app
    .config(function($locationProvider) {
         // This is just a formality to make it so you don't need #'s in urls
        $locationProvider.html5Mode(true);
    })

    .controller('MainController', function($scope, $state, CategoryService, UserFactory, usercartFactory, $timeout, ngNotify) {
        $scope.user = UserFactory.user;
        $scope.notifications = [];
        $scope.$watch(function() {
            return UserFactory.user;
        }, function(user) {
            if (!user) {
                return;
            }

            $scope.user = user;
            UserFactory.checkForNotifications().then(function(payload) {
                $scope.notifications = payload;
                if ($scope.notifications.length > 0) {
                    ngNotify.set('Reminder: ' + $scope.notifications[0].product + ' is due back soon!', 'default');
                }
                $scope.notifications = [];
            });
        });

        $scope.categories = [];
        $scope.carttotal = usercartFactory.getTotal();
        $scope.cartsize = usercartFactory.getNumOfItems();
        CategoryService.getCategories().then(function(payload) {
            $scope.categories = payload;
        });

        $scope.$watch(function() {
            return usercartFactory.getTotal();
        }, function(newValue) {
            $scope.carttotal = newValue;
        });

        $scope.$watch(function() {
            return usercartFactory.getNumOfItems();
        }, function(newValue) {
            $scope.cartsize = newValue;
        });

        $scope.signout = function() {
            $scope.user = undefined;
            UserFactory.signout();
            $state.go('home');
        };
    })

;
