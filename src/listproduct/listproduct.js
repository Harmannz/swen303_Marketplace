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
            testChunks:false,
            singleFile: true
        }
        flowFactoryProvider.on('catchAll', function (event,b,data) {
            console.log(event,b,data)
            if(event == 'fileAdded'){
                $('#prod-image-preview').removeClass('ratio1_1');
                $('#prod-image-preview').css('display','inline-block');
            }
            if(event=='fileSuccess'){
               console.log(data);
            }
         });
	})

	.controller('listProductController',function($state, $scope, CategoryService, ProductService, UserFactory, SpecificationService ) {

        if (!UserFactory.user) {
            $state.go('register', { redirectstate: 'listproduct' });
        } else {
            $scope.userid = UserFactory.user.uid;
        }

        
        $scope.product = {
            minrentdays: 7,
            maxrentdays: 7,
            mindaystobuy: 7,
            sellerid:  $scope.userid
        };



        $scope.specs = [
            {
                name: "Brand",
                value: " "
            },{
                name: "Made in",
                value: " "
            },{
                name: "Warranty length",
                value: 0
            }
        ];

        $scope.removeSpec = function(index){
            if (index > -1) {
                $scope.specs.splice(index, 1);
            }
        }
        $scope.addSpec = function(){
            $scope.specs.push({name:" ",value:" "});
        }

        //
        for(var i = 0; i < $scope.specs.length; i++){
            $scope.specs[i].type = typeof $scope.specs[i].value;
        }
        
        $scope.imageUploaded = false;

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
            console.log("submit selected", $scope.product);
            if(!$scope.imageUploaded){
                console.log("image not uploaded",this.productForm);
                $scope.error = true;
                return;
            }
            

            var prod = cleanProduct($scope.product);
            console.log(prod); 
            ProductService.addProduct(prod).then(function(productId){
                console.log("uploadedProduct \n uplading specs");
                SpecificationService.uploadSpecifications({specs:$scope.specs,productId:productId}).then(function(){
                    console.log("Uploaded specs!");
                    $state.go('product',{id:productId});
                });
            });
        }

        /*Clean the product ready for submission*/
        function cleanProduct(p){
            if(!$scope.canBuy) delete p.purchaseprice;

            p.dimensions = [p.width,p.height,p.length].join(' x ') + " cm";
            delete p.width;
            delete p.height;
            delete p.length;
            return p;
        }

        $scope.checkRentDays = function(){

            $scope.product.maxrentdays = ($scope.product.maxrentdays < $scope.product.minrentdays)? $scope.product.minrentdays : $scope.product.maxrentdays;

            if($scope.product.mindaystobuy < $scope.product.minrentdays){
                $scope.product.mindaystobuy = $scope.product.minrentdays;
            }  if ($scope.product.mindaystobuy > $scope.product.maxrentdays){
                $scope.product.mindaystobuy = $scope.product.maxrentdays;
            }

        }

        $scope.flowFileSuccess = function(a,b,c){
            var name = angular.fromJson(b).filename;
            $scope.product.image = name;
            $scope.imageUploaded = true;
            $scope.error = false;
        }

	})

;
