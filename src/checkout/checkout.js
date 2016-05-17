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

        $scope.productsToPurchase = usercartFactory.getToPurchase();
        console.log($scope.productsToPurchase);

        $scope.productsToRent = usercartFactory.getToRent();
        console.log($scope.productsToRent);

        $scope.purchaseTotal = usercartFactory.purchaseTotal();
        $scope.rentTotal = usercartFactory.rentTotal();
        $scope.total = usercartFactory.getTotal();
        $scope.tax = usercartFactory.getTax()
        $scope.shipping = usercartFactory.getShipping();
        $scope.cartsize = usercartFactory.getNumOfItems();

        $scope.removeProduct = function(pid){
            console.log("Remove product with id: " + pid);
            usercartFactory.removeFromPurchase(pid);
            this.updatePrices();
        };

        $scope.removeProductFromRent = function(pid){
            console.log("Remove product with id: " + pid);
            usercartFactory.removeFromRent(pid);
            this.updatePrices();
        };

        $scope.updatePrices = function(){
            $scope.purchaseTotal = usercartFactory.purchaseTotal();
            $scope.rentTotal = usercartFactory.rentTotal();
            $scope.total = usercartFactory.getTotal();
            $scope.tax = usercartFactory.getTax()
            $scope.shipping = usercartFactory.getShipping();
            console.log($scope.productsToPurchase);
        };
        // calling our submit function.
        $scope.submitForm = function() {
            console.log("submit selected");
            console.log("check if user's cart is not empty?");
            $state.go("payment");

        }
	})

;
