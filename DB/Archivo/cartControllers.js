const cart = require('./cart');

class cartControllersArchive { 
  static newCart(){
    return cart.createCart();
  }
  static getById(cartId){
    return cart.getCart(cartId);
  }
  static addProduct(cartId, productId){
    return cart.addToCart(cartId, productId);
  }
  static deleteProduct(cartId, productId){
    return cart.deleteFromCart(cartId, productId);
  }
  static empty(cartId){
    return cart.emptyCart(cartId);
  }
  static deleteCart(cartId){
    return cart.deleteCart(cartId);
  }
}

export const CartControllersArchive = cartControllersArchive