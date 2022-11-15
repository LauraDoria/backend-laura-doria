const CartServices = require("../Services/CartServices");

class CartControllers { 
  static addNewCart(){
    return //CartServices.createCart();
  }
  static getCartById(cartId){
    return //CartServices.getCart(cartId);
  }
  static getCartList(){
    return //CartServices.getAll();
  }
  static addProductToCart(productId){
    return //CartServices.addToCart(productId);
  }
  static deleteProductFromCart(cartId, updatedData){
    return //CartServices.deleteFromCart(cartId, updatedData);
  }
  static emptyCart(cartId){
    return //CartServices.emptyCart(cartId);
  }
  static deleteCart(cartId){
    return //CartServices.deleteCart(cartId);
  }
  //static deleteCartList(){
    //return //CartServices.deleteAll();
  //}
}

export default CartControllers