/**
 * Created by Harman on 14/05/2016.
 */
angular.module('swen303.factory.cart', [])
    .factory('usercartFactory', ['$http', function($http){
        var urlBase = 'api/' //TODO: Which url are we using for purchasing ??
        var cart = {
            toPurchase: [],
            toRent: [],
            userDetails: {}
        };

        return {

            addToPurchase: function(product) {
                var productExists = false;
                for(var i = 0; i < cart.toPurchase.length; i++){
                    if(cart.toPurchase[i].pid == product.pid){
                        cart.toPurchase[i].quantity+=1;
                        productExists = true;
                    }
                }
                if(productExists == false) {
                    product.quantity = 1;
                    cart.toPurchase.push(product);
                }
            },
            getToPurchase: function(){
                return cart.toPurchase;
            },
            getToRent: function(){
                return cart.toRent;
            },
            getUserDetails: function(){
                return cart.userDetails;
            },
            addToRent: function(product){
                var productExists = false;
                for(var i = 0; i < cart.toRent.length; i++){
                    if(cart.toRent[i].pid == product.pid){
                        cart.toRent[i].quantity+=1;
                        productExists = true;
                    }
                }
                if(productExists == false) {
                    product.quantity = 1;
                    cart.toRent.push(product);
                }
            },
            removeFromPurchase: function(product){
                for(var i =0; i < cart.toPurchase.length; i++){
                    if (cart.toPurchase[i].productid == product.productid){
                        cart.toPurchase.splice(index,1); //remove product from cart
                    }
                }
            },
            clearPurchase: function(){
                cart.toPurchase = {};
            },
            clearRent: function(){
                cart.toRent={};
            },
            addUserDetails: function(userDetails){
                cart.userDetails = userDetails;
            },
            clearUserDetails: function(){
                cart.userDetails = {};
            },
            clearCart: function(){
                this.clearPurchase();
                this.clearRent();
                this.clearUserDetails();
            }

        }
    }])
;