angular.module('swen303.cart', ['swen303.services.product', 'swen303.factory.cart'])

	.config(function($stateProvider) {
		$stateProvider.state('cart', {
			url: '/cart',
			views: {
				"main": {
					templateUrl: 'checkout/checkout.html',
					controller: 'CartController'
				}
			},
            resolve: {
                Products: ['ProductService', function(ProductService) {
                    return ProductService.getFeaturedProducts().then(function(payload) {
                        return payload;
                    });
                }]
            }
		});
	})

	.controller('CartController',function($scope, usercartFactory, Products) {
        
        //add temp data to user cart for purchasing
        for(var i = 0; i < Products.length;i++){
             usercartFactory.addToPurchase(Products[i]);
        }

        //add temp data to user cart for renting
        for(var i = 0; i < Products.length;i++){
            var product = Products[i];
            //renting product must have rentdays as a property to determine how many days the product can be rented for?
            product.rentdays = Products[i].minrentdays; //does this create a new Product object ???
            usercartFactory.addToRent(Products[i]);
        }

        $scope.productsToPurchase = usercartFactory.getToPurchase();
        console.log($scope.productsToPurchase);

        $scope.productsToRent = usercartFactory.getToRent();
        console.log($scope.productsToRent);

        $scope.purchaseTotal = usercartFactory.purchaseTotal();
        $scope.rentTotal = usercartFactory.rentTotal();
        console.log($scope.rentTotal);
        $scope.total = usercartFactory.getTotal();
        $scope.tax = usercartFactory.getTax()
        $scope.shipping = usercartFactory.getShipping();

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
        }
	})

;
