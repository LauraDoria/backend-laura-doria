import { CartsFirebase } from './firebaseCart'

class cartControllersFirebase { 
  static newCart(){
    return CartsFirebase.createCart()
  }
  static getById(cartId){
    return CartsFirebase.getCart(cartId)
  }
  static addProduct(cartId, productId){
    return CartsFirebase.addToCart(cartId, productId)
  }
  static deleteProduct(cartId, productId){
    return CartsFirebase.deleteFromCart(cartId, productId)
  }
  static empty(cartId){
    return CartsFirebase.emptyCart(cartId)
  }
  static deleteCart(cartId){
    return CartsFirebase.deleteCart(cartId)
  }
}

export const CartControllersFirebase = cartControllersFirebase