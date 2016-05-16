angular.module('swen303.cart.payment', ['swen303.factory.cart'])

	.config(function($stateProvider) {
		$stateProvider.state('cart/payment', {
			url: '/cart/payment',
			views: {
				"main": {
					templateUrl: 'checkout/payment/payment.html',
					controller: 'PaymentController'
				}
			}
		});
	})

	.controller('PaymentController',function($scope, usercartFactory) {
        //get data from paymentdetails
        $scope.user = usercartFactory.getUser();
		$scope.purchaseTotal = usercartFactory.purchaseTotal();
		$scope.rentTotal = usercartFactory.rentTotal();
		$scope.total = usercartFactory.getTotal();
		$scope.tax = usercartFactory.getTax()
		$scope.shipping = usercartFactory.getShipping();
	})

;
