angular.module('swen303.services.product', [])

    .service('ProductService', function($http, $q, $timeout) {

        this.getFeaturedProducts = function() {
            /*return $http.get('/api/products/featured').then(function(payload) {
                return payload.data;
            });*/
            var promise = $q.defer();
            $timeout(function() {
                promise.resolve([]);
            }, 0.1);
            return promise.promise;
        };

        this.getProduct = function(product_id) {
            return $http.get('/api/products/' + product_id).then(function(payload) {
                return payload.data;
            });
        };

        this.getFromCategory = function(cid) {
            return $http.get('/api/products/category/' + cid).then(function(payload) {
                return payload.data;
            });
        };

        this.search = function(category_id, query) {
            return $http.get('/api/products/' + category_id + '/' + query).then(function(payload) {
                return payload.data;
            });
        };

        this.search = function(searchStr, cid) {
            return $http.get('/api/products/' + cid + '/'+searchStr).then(function(payload) {
                return payload.data;
            });
        }

        this.addProduct = function(productData){
            return $http.post('/api/products/',productData).then(function(payload) {
                return payload.data;
            });   
        }

    })

;
