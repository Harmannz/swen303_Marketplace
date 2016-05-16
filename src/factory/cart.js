/**
 * Created by Harman on 14/05/2016.
 */
angular.module('swen303.factory.cart', [])
    .factory('usercartFactory', ['$http', function($http){
        var urlBase = 'api/' //TODO: Which url are we using for purchasing/renting ??
        var cart = {
            toPurchase: [],
            toRent: [],
            user: {}
        };

        return {
            //adds product to purchase.
            addToPurchase: function(product) {
                var productExists = false;
                for(var i = 0; i < cart.toPurchase.length; i++){
                    if(cart.toPurchase[i].pid == product.pid){
                        cart.toPurchase[i].quantity += 1;
                        productExists = true;
                    }
                }
                if(productExists == false) {
                    product.quantity = 1;
                    cart.toPurchase.push(product);
                }
            },
            //adds product to purchase.
            // Product must have the rentdays (number of days for renting) as a property
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
            //adds user details to cart
            addUser: function(user){
                cart.user = user;
            },
            //getter method for accessing the products to purchase
            getToPurchase: function(){
                return cart.toPurchase;
            },
            //getter method for accessing the products to rent
            getToRent: function(){
                return cart.toRent;
            },
            //getter for user details
            getUser: function(){
                return cart.user;
            },
            getNumOfItems: function(){
                var numOfItems = 0;
                //sum the counts of Purchases and rentals 
                for(var i = 0; i < cart.toPurchase.length; i++){
                    numOfItems += cart.toPurchase[i].quantity;
                }
                for(var i = 0; i < cart.toRent.length; i++){
                    numOfItems += cart.toRent[i].quantity;
                }
                return numOfItems;
            },
            //removes product matching pid from purchase list
            removeFromPurchase: function(pid){
                for(var i =0; i < cart.toPurchase.length; i++){
                    if (cart.toPurchase[i].pid == pid){
                        cart.toPurchase.splice(i,1); //remove product from cart
                    }
                }
            },
            //removes product matching pid from rent list
            removeFromRent: function(pid){
                for(var i =0; i < cart.toRent.length; i++){
                    if (cart.toRent[i].pid == pid){
                        cart.toRent.splice(i,1); //remove product from cart
                    }
                }
            },
            //empties purchase list
            clearPurchase: function(){
                cart.toPurchase = [];
            },
            //empties rent list
            clearRent: function(){
                cart.toRent= [];
            },
            //empties user details
            clearUser: function(){
                cart.user = {};
            },
            //empties everything in cart
            clearCart: function(){
                this.clearPurchase();
                this.clearRent();
                this.clearUser();
            },
            
            //Calculation Functions
            //returns the total of purchase list
            purchaseTotal: function(){
                var total=0;
                    for(var i = 0; i < cart.toPurchase.length; i++){
                        total += cart.toPurchase[i].purchaseprice * cart.toPurchase[i].quantity;
                    }
                return total;
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
                return (this.rentTotal() + this.purchaseTotal()) * 0.15;
            },
            //returns the total shipping cost = 9.73% of weightg
            getShipping: function(){
                var shippingCost = 0;
                for(var i = 0; i < cart.toPurchase.length; i++){
                    shippingCost += cart.toPurchase[i].weightg * cart.toPurchase[i].quantity *  .00973 ;
                }
                for(var i = 0; i < cart.toRent.length; i++){
                    shippingCost += cart.toRent[i].weightg * cart.toRent[i].quantity * .00973 ;
                }
                return shippingCost;
            },
            //returns the total cost
            getTotal: function(){
                return this.purchaseTotal() + this.rentTotal() + this.getShipping();
            }

        }
    }])
;