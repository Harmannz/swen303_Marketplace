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
        //TODO: refactor the code here so that purchaseTotal, getTax, getShipping etc are retrieved from factory?
        //TODO: ASK BROCK how to watch changes in quantity and update the prices!!!
        //add products array to usercartFactory
        var products = [];
        for(var i = 0; i < Products.length; i++){
            products.push(Products[i]);
        }
        for(var i = 0; i < products.length;i++){
             usercartFactory.addToPurchase(products[i]);
        }

        $scope.purchasingProducts = usercartFactory.getToPurchase();
        console.log(usercartFactory.getToPurchase());

        $scope.purchaseTotal = function(){
            var total=0;
            for(var i = 0; i < $scope.purchasingProducts.length;i++){
                total+=$scope.purchasingProducts[i].purchaseprice * $scope.purchasingProducts[i].quantity;
            }
            return total;
        };

        $scope.total = function(){
            var total=0;
            total += this.purchaseTotal();
            total += this.getTax();
            return total;
        };

        $scope.getTax= function(){
            return this.purchaseTotal() * 0.15;
        };
        $scope.getShipping= function(){
            var shippingCost = 0;
            for(var i = 0; i < $scope.purchasingProducts.length;i++){
                shippingCost+=$scope.purchasingProducts[i].weightg * .00973 ;
            }
            return shippingCost;
        }
        $scope.removeProduct = function(pid){
            console.log("Remove product with id: " + pid);
        }


        // calling our submit function.
        $scope.submitForm = function() {
            console.log("submit selected");
            console.log("validate user input if required here.");
        }
	})

;
