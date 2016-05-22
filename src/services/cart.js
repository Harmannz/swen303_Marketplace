angular.module('swen303.services.cart', [])

    .service('CartService', function($http, $timeout, $q) {
        
        this.postItemsToRent = function(usercart) {
            return $http.post('/api/cart/', JSON.stringify(usercart)).then(function(payload) {
                return payload; //needs to be a truthy element
            });   
        }

    })

;
