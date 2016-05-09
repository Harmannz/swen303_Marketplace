// This is the module for the home page
angular.module('swen303.home', [])

    // Config is where the route is set up - config takes a function,
    // which itself requires all the things you want to use. Eg, we want
    // to use the $stateProvider service so we pass that into the function
    .config(function($stateProvider) {
        // We define a state/route with this function. The state is called home,
        // and the route is specified with the url option. The views option
        // requiers you to specify the name of the view you're injecting this
        // state into, (this is specified in index.html as ui-view="main"), and
        // then you have to give it the templateUrl you want to inject,
        // as well as the name of the controller you want to tie to the view
        $stateProvider.state('home', {
            url: '/',
            views: {
                "main": {
                    templateUrl: 'home/home.html',
                    controller: 'HomeController'
                }
            }
        });
    })

    // A controller is what handles the logic of what goes on in a view.
    // The $scope object is what has access to the view, so any property you
    // specify on the $scope object is accessible in the html. These are also
    // 2 way bindings, so when you change it in the javascript code, it changes
    // on the html page, and vice versa.
    .controller('HomeController', function($scope) {
       $scope.products = [
           {
               name: 'iPad',
               image: 'ipad.png',
               price: 699.99,
               rent: 40
           },
           {
               name: 'Kindle',
               image: 'kindle.png',
               price: 299.99,
               rent: 20
           },
           {
               name: 'Canon 70d',
               image: 'canon.png',
               price: 1328.47,
               rent: 70
           }
       ];
    })

;
