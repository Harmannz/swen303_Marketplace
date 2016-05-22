angular.module('swen303.cart.payment', ['swen303.factory.cart', 'ngNotify', 'swen303.services.cart'])

	.config(function($stateProvider) {
		$stateProvider.state('payment', {
			url: '/cart/payment',
			views: {
				"main": {
					templateUrl: 'checkout/payment/payment.html',
					controller: 'PaymentController'
				}
			}
		});
	})

	.controller('PaymentController',function($scope, usercartFactory, UserFactory, CartService, ngNotify) {

        //get data from paymentdetails
        $scope.user = UserFactory.user;
		$scope.rentTotal = usercartFactory.rentTotal();
		$scope.total = usercartFactory.getTotal();
		$scope.tax = usercartFactory.getTax();
		$scope.shipping = usercartFactory.getShipping();
		// calling our submit function.
        $scope.submitForm = function() {
        	var usercart = usercartFactory.getCart();
        	usercart.userid = UserFactory.user.uid;
        	console.log(usercart);

            CartService.postItemsToRent(usercart).then(function(payload) {
            	if (payload){
            		ngNotify('Transaction completed. Thank You!', 'success');
            		$state.go('home');
            	}else{
            		ngNotify('Error occurred during payment.' , 'error');
            	}
			});
            

        }
	})

;
