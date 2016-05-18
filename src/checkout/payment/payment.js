angular.module('swen303.cart.payment', ['swen303.factory.cart'])

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

	.controller('PaymentController',function($scope, usercartFactory, UserFactory) {

        //get data from paymentdetails
		console.log("user: " + UserFactory.user);
        $scope.user = UserFactory.user;
		$scope.purchaseTotal = usercartFactory.purchaseTotal();
		$scope.rentTotal = usercartFactory.rentTotal();
		$scope.total = usercartFactory.getTotal();
		$scope.tax = usercartFactory.getTax();
		$scope.shipping = usercartFactory.getShipping();
	})

;
