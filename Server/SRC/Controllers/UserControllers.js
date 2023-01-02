const {UserServices} = require("../Services/UserServices")

class UserControllers { 
  static createUser(userData){
    return UserServices.createUserService(userData)
  }
  static getUserById(userId){
    return UserServices.getUserByIdService(userId)
  }
  static getAllUsers(){
    return UserServices.getAllUsersService()
  }
  static updateUserInfo(userId, userData){
    return UserServices.updateUserInfoService(userId, userData)
  }
  static deleteUserById(userId){
    return UserServices.deleteUserByIdService(userId)
  }
  static deleteAllUsers(){
    return UserServices.deleteAllUsersService()
  }
  static addProductToCart(userId, productId, productQuantity){
    return UserServices.addProductToCartService(userId, productId, productQuantity)
  }
  static getProductsInCart(userId){
    return UserServices.getProductsInCartService(userId)
  }
  static updateProductInCart(userId, productId, productQuantity){
    return UserServices.updateProductInCartService(userId, productId, productQuantity)
  }
  static deleteProductFromCart(userId, productId){
    return UserServices.deleteProductFromCartService(userId, productId)
  }
  static emptyCart(userId){
    return UserServices.emptyCartService(userId)
  }
}

module.exports = {UserControllers}