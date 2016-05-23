angular.module('swen303.services.product', [])

    .service('ProductService', function($http, $q, $timeout) {

        this.getFeaturedProducts = function() {
            return $http.get('/api/products/featured').then(function(payload) {
                return payload.data;
            });
            // var promise = $q.defer();
            // $timeout(function() {
            //     promise.resolve([]);
            // }, 0.1);
            // return promise.promise;
        };

        this.getProduct = function(product_id) {
            return $http.get('/api/products/' + product_id).then(function(payload) {
                return payload.data;
            });
        };

        this.getQuantity = function(product_id) {
            return $http.get('/api/products/quantity/' + product_id).then(function(payload) {
                return payload.data;
            });
        };

        this.getInstances = function(product_id) {
            return $http.get('/api/products/instances/' + product_id).then(function(payload) {
                return payload.data;
            });
        };

        this.getAvailable = function(product_id) {
            return $http.get('/api/products/available/' + product_id).then(function(payload) {
                return payload.data;
            });
        };

        this.getFromCategory = function(cid) {
            return $http.get('/api/products/category/' + cid).then(function(payload) {
                return payload.data;
            });
        };

        // this.search = function(category_id, query) {
        //     return $http.get('/api/products/search/' + category_id + '/' + query).then(function(payload) {
        //         return payload.data;
        //     });
        // };

        this.search = function(searchStr, cid) {
            return $http.get('/api/products/search/' + cid + '/'+searchStr).then(function(payload) {
                return payload.data;
            });
        }

        this.addProduct = function(productData){
            return $http.post('/api/products/', productData).then(function(payload) {
                return payload.data;
            });
        }

        this.returnProduct = function(order_id, instance_id){
            //Set instanceInorder to returned
            return $http.post('/api/orders/'+order_id+'/return/'+instance_id).then(function(payload) {
                //Free instance to be available
                return $http.post('/api/products/'+instance_id+'/return').then(function(payload) {
                    return payload.data;
                });
            });
        }

        this.buyProduct = function(instance_id) {
            return $http.post('/api/products/' + instance_id + '/sold').then(function(payload) {
                return payload.data;
            });
        }

    })

;
