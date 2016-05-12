angular.module('swen303.services.product', [])

    .service('ProductService', function($http) {

        this.getFeaturedProducts = function() {
            return $http.get('/api/products/featured').then(function(payload) {
                return payload.data;
            });
        };

    })

;