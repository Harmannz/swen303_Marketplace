angular.module('swen303.services.specifications', [])

    .service('SpecsService', function($http) {

        this.getSpecifications = function(product_id) {
            return $http.get('/api/specifications/'+product_id).then(function(payload) {
                return payload.data;
            });
        }

    })
;
