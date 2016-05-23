/**
 * Created by Harman on 14/05/2016.
 */
angular.module('swen303.factory.cart', [])
    .factory('usercartFactory', ['$http', function($http){
        var cart = {
            toRent: []
        };
        // Check for existing cart
        try {
            cart = JSON.parse(localStorage.getItem('cart'));
            // If there is a partial cart object for some reason, get rid of it
            if (!cart || !cart.toRent) {
                cart = {
                    toRent: []
                }
            }
        } catch(error) {}
        console.log(cart);
        return {
            //adds product to purchase.
            // Product must have the rentdays (number of days for renting) as a property
            addToRent: function(product){
                if (product.maxquantity < 1){
                    return false;
                }
                console.log("set quantity to 1");
                return this.addMultipleToRent(product, 1);

            },
            // Product must have the rentdays (number of days for renting) as a property and quantity already set
            addMultipleToRent: function(product, quantity){
                //check if rent exists
                console.log("maxquantity: " + product.maxquantity);
                console.log(cart.toRent);
                if (product.maxquanity < quantity){
                    return false;
                }
                console.log("inside cart: " + quantity);
                if (!quantity){
                    quantity = 0;
                }
                var productExists = false;
                for(var i = 0; i < cart.toRent.length; i++){
                    if(cart.toRent[i].pid == product.pid){
                        if((cart.toRent[i].quantity + quantity) > product.maxquantity){
                            //cannot add more products to cart than maxquantity
                            return false;
                        }
                        cart.toRent[i].quantity+=quantity;
                        productExists = true;
                        break;
                    }
                }
                if(productExists == false) {
                    product.quantity = quantity;
                    cart.toRent.push(product);
                }
                try {
                    localStorage.setItem('cart', JSON.stringify(cart));
                } catch (error) {}

                return true;
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
                try {
                    localStorage.setItem('cart', JSON.stringify(cart));
                } catch (error) {}
            },
            //empties rent list
            clearRent: function(){
                cart.toRent = [];
                try {
                    localStorage.setItem('cart', JSON.stringify(cart));
                } catch (error) {}
            },
            //empties everything in cart
            clearCart: function(){
                this.clearRent();
                try {
                    localStorage.setItem('cart', JSON.stringify(cart));
                } catch (error) {}
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
                return shippingCost;
            },
            //returns the total cost
            getTotal: function(){
                return this.rentTotal() + this.getShipping();
            },
            //return cart object
            getCart: function(){
                return cart;
            },

            getQuantityById: function(pid){
                for(var i = 0; i < cart.toRent.length; i++){
                    if(cart.toRent[i].pid === pid){
                        if (cart.toRent[i].quantity){
                            return cart.toRent[i].quantity;
                        }
                    }
                }
                return 0;
            }

        }
    }])
;