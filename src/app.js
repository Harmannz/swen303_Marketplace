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
    'swen303.services.category',
    'swen303.factory.cart'
])

    // Config just specifies configuration parameters for the app
    .config(function($locationProvider) {
         // This is just a formality to make it so you don't need #'s in urls
        $locationProvider.html5Mode(true);
    })

    .controller('MainController', function($scope, CategoryService) {
        $scope.categories = [];
        CategoryService.getCategories().then(function(payload) {
            $scope.categories = payload;
        });
    })

;
