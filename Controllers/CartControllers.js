const CartServices = require("../Services/CartServices");

class CartControllers { 
  static addNewCart(){
    return products.save();
  }
  static getCartById(cartId){
    return products.getById(cartId);
  }
  static getCartList(){
    return products.getAll();
  }
  static addProductToCart(productId){
    return products.update(productId);
  }
  static deleteProductFromCart(cartId, updatedData){
    return products.update(cartId, updatedData);
  }
  static emptyCart(cartId){
    return products.update(cartId);
  }
  static deleteCart(cartId){
    return products.deleteById(cartId);
  }
  static deleteCartList(){
    return products.deleteAll();
  }
}

export default CartControllers