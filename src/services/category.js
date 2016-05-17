angular.module('swen303.services.category', [])

    .service('CategoryService', function($http) {

        this.getCategories = function() {
            return $http.get('/api/categories').then(function (payload) {
                return payload.data;
            });
        };

        this.get = function(cid) {
            return $http.get('/api/categories/'+cid).then(function (payload) {
                return payload.data;
            });
        };

    })

;
