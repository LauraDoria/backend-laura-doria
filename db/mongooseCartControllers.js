import {CartsMongoose} from './mongooseCart'

class cartControllersMongoose { 
  static newCart(){
    return CartsMongoose.createCart()
  }
  static getById(cartId){
    return CartsMongoose.getCart(cartId)
  }
  static addProduct(cartId, productId){
    return CartsMongoose.addToCart(cartId, productId)
  }
  static deleteProduct(cartId, productId){
    return CartsMongoose.deleteFromCart(cartId, productId)
  }
  static empty(cartId){
    return CartsMongoose.emptyCart(cartId)
  }
  static deleteCart(cartId){
    return CartsMongoose.deleteCart(cartId)
  }
}

export const CartControllersMongoose = cartControllersMongoose