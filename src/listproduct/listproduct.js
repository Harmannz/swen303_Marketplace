angular.module('swen303.listproduct', ['swen303.services.product'])

	.config(function($stateProvider) {
		$stateProvider.state('listproduct', {
			url: '/listproduct',
			views: {
				"main": {
					templateUrl: 'listproduct/listproduct.html',
					controller: 'listProductController'
				}
			}
		});
	})

	.controller('listProductController',function($state, $scope, usercartFactory) {

        $scope.product = {};
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

         $scope.back = function(){
            $state.go('home');
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
