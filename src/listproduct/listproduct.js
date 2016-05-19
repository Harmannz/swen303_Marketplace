angular.module('swen303.listproduct', ['swen303.services.product','flow','swen303.services.category'])

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

	.controller('listProductController',function($state, $scope, CategoryService ) {

        $scope.product = {
            minrentdays: 7,
            maxrentdays: 7
        };
        console.log($scope.product);

        $scope.categories = [];
        CategoryService.getCategories().then(function(payload) {
            $scope.categories = payload;
        });

        $scope.back = function(){
            $state.go('home');
        };


        $scope.removeImage = function(flow,file){
            flow.removeFile(file);
        }

        // calling our submit function.
        $scope.submitForm = function(flow) {
            console.log("submit selected");
            console.log("check if user's cart is not empty?");
            flow.upload();
        }
	})

;
