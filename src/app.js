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
    'swen303.browse',
    'swen303.register',
    'swen303.services.category',
    'swen303.factory.cart',
    'swen303.factory.user'
])

    // Config just specifies configuration parameters for the app
    .config(function($locationProvider) {
         // This is just a formality to make it so you don't need #'s in urls
        $locationProvider.html5Mode(true);
    })

    .controller('MainController', function($scope, CategoryService, UserFactory, usercartFactory) {
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
    })

;
