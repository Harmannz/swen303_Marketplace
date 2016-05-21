angular.module('swen303.listproduct', ['swen303.services.product','flow','swen303.services.category'])

	.config(function($stateProvider, flowFactoryProvider) {
		$stateProvider.state('listproduct', {
			url: '/listproduct',
			views: {
				"main": {
					templateUrl: 'listproduct/listproduct.html',
					controller: 'listProductController'
				}
			}
		});
        flowFactoryProvider.defaults = {
            target:'/api/products/imageupload', 
            testChunks:false
        }
        flowFactoryProvider.on('catchAll', function (event) {
            console.log('event', event)
            if(event == 'fileAdded'){
                $('#prod-image-preview').removeClass('ratio1_1');
                $('#prod-image-preview').css('display','inline-block');
            }
         });
	})

	.controller('listProductController',function($state, $scope, CategoryService ) {

        $scope.product = {
            minrentdays: 7,
            maxrentdays: 7,
            mindaystobuy: 7
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
            flow.upload();
        }

        $scope.checkRentDays = function(){

            $scope.product.maxrentdays = ($scope.product.maxrentdays < $scope.product.minrentdays)? $scope.product.minrentdays : $scope.product.maxrentdays;

            if($scope.product.mindaystobuy < $scope.product.minrentdays){
                $scope.product.mindaystobuy = $scope.product.minrentdays;
            }  if ($scope.product.mindaystobuy > $scope.product.maxrentdays){
                $scope.product.mindaystobuy = $scope.product.maxrentdays;
            }
            // $scope.product.mindaystobuy = Math.max($scope.product.mindaystobuy, 0);
            // $scope.product.maxrentdays = Math.max($scope.product.maxrentdays,0);
            // $scope.product.minrentdays = Math.max($scope.product.minrentdays,0);

        }
	})

;
