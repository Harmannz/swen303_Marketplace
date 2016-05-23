angular.module('swen303.profile.orders', ['swen303.services.product', 'ngNotify'])

	.config(function($stateProvider) {
		$stateProvider.state('profile.orders', {
			url: '',
			views: {
				"profile": {
					templateUrl: 'profile/orders/orders.html',
					controller: 'OrdersController'
				}
			},
			resolve: {
				Orders: ['UserFactory', function(UserFactory) {
					return UserFactory.getOrders().then(function(payload) {
						return payload;
					});
				}]
			}
		});
	})

	.controller('OrdersController', function($scope, Orders, ProductService, UserFactory, ngNotify) {
		$scope.orders = Orders;

		for (var i = 0 ; i < $scope.orders.length ; i++) {
			$scope.orders[i].purchaseable = ((new Date().getTime() - (new Date($scope.orders[i].clocked_out).getTime())) / (1000 * 60 * 60 * 24)) > $scope.orders[i].mindaystobuy;
			$scope.orders[i].overdue = new Date().getTime() > new Date($scope.orders[i].due_back).getTime();
			$scope.orders[i].purchaseAfter = Math.ceil($scope.orders[i].mindaystobuy - ((new Date().getTime() - (new Date($scope.orders[i].clocked_out).getTime())) / (1000 * 60 * 60 * 24)));
			$scope.orders[i].purchasePrice = $scope.orders[i].purchaseprice - ((new Date().getTime() - (new Date($scope.orders[i].clocked_out).getTime())) / (1000 * 60 * 60 * 24) * $scope.orders[i].rentalpricepd);
		}

		console.log($scope.orders);

		$scope.returnItem = function(order){
			//Return item
			console.log("return item : " + order.pid);
			console.log(order);
				ProductService.returnProduct(order.order_id, order.instance_id).then(function(payload) {
					if(payload){
						refreshOrders();
						ngNotify.set(order.name + " has been returned", 'success');
					}
					return payload;
				});
		}

		refreshOrders = function(){
			UserFactory.getOrders().then(function(payload) {
				$scope.orders = payload;
			});
		}
	})

;
