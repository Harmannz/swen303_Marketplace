/**
 * Created by Harman on 14/05/2016.
 */
angular.module('swen303.factory.cart', [])
    .factory('usercartFactory', ['$http', function($http){
        var urlBase = 'api/' //TODO: Which url are we using for purchasing/renting ??
        var cart = {
            toRent: []
        };

        return {
            //adds product to purchase.
            // Product must have the rentdays (number of days for renting) as a property
            addToRent: function(product){
                var productExists = false;
                for(var i = 0; i < cart.toRent.length; i++){
                    if(cart.toRent[i].pid == product.pid){
                        cart.toRent[i].quantity+=1;
                        productExists = true;
                        break;
                    }
                }
                if(productExists == false) {
                    product.quantity = 1;
                    cart.toRent.push(product);
                }
            },
            //getter method for accessing the products to rent
            getToRent: function(){
                return cart.toRent;
            },
            getNumOfRentals: function(){
                var numOfRentals = 0;
                for(var i = 0; i < cart.toRent.length; i++){
                    numOfRentals += cart.toRent[i].quantity;
                }
                return numOfRentals;
            },
            getNumOfItems: function(){
                return this.getNumOfRentals();
            },
            //removes product matching pid from rent list
            removeFromRent: function(pid){
                for(var i = 0; i < cart.toRent.length; i++){
                    if (cart.toRent[i].pid == pid){
                        cart.toRent.splice(i,1); //remove product from cart
                    }
                }
            },
            //empties rent list
            clearRent: function(){
                cart.toRent = [];
            },
            //empties everything in cart
            clearCart: function(){
                this.clearRent();
            },
            //returns the total rent cost
            rentTotal: function(){
                var total=0;
                for(var i = 0; i < cart.toRent.length; i++){
                    total += cart.toRent[i].rentalpricepd * cart.toRent[i].rentdays * cart.toRent[i].quantity;
                }
                return total;
            },
            //returns the total tax cost == 15% of total cost
            getTax:  function(){
                return this.rentTotal() * 0.15;
            },
            //returns the total shipping cost = 0.973% of weightg
            getShipping: function(){
                var shippingCost = 0;
                for(var i = 0; i < cart.toRent.length; i++){
                    shippingCost += cart.toRent[i].weightkg * cart.toRent[i].quantity * .00973 ;
                }
                console.log("Shipping cost in cart.js: " + shippingCost);
                return shippingCost;
            },
            //returns the total cost
            getTotal: function(){
                return this.rentTotal() + this.getShipping();
            }

        }
    }])
;