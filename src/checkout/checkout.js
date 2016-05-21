angular.module('swen303.cart', ['swen303.services.product', 'swen303.factory.cart'])

	.config(function($stateProvider) {
		$stateProvider.state('cart', {
			url: '/cart',
			views: {
				"main": {
					templateUrl: 'checkout/checkout.html',
					controller: 'CartController'
				}
			}
		});
	})

	.controller('CartController',function($state, $scope, usercartFactory) {

        $scope.productsToRent = usercartFactory.getToRent();

        $scope.rentTotal = usercartFactory.rentTotal();
        $scope.total = usercartFactory.getTotal();
        $scope.tax = usercartFactory.getTax();
        $scope.shipping = usercartFactory.getShipping();
        $scope.cartsize = usercartFactory.getNumOfItems();

         $scope.back = function(){
            $state.go('home');
        };

        $scope.removeProductFromRent = function(pid){
            console.log("Remove product with id: " + pid);
            usercartFactory.removeFromRent(pid);
            this.updatePrices();
        };

        $scope.updatePrices = function(){
            $scope.rentTotal = usercartFactory.rentTotal();
            $scope.total = usercartFactory.getTotal();
            $scope.tax = usercartFactory.getTax();
            $scope.shipping = usercartFactory.getShipping();
            $scope.cartsize = usercartFactory.getNumOfItems(); //cartsize should be linked to model via ng-model but a'int nobody got time for that
        };
        // calling our submit function.
        $scope.submitForm = function() {
            console.log("submit selected");
            console.log("check if user's cart is not empty?");
            $state.go("payment");

        }
	})

;
