import UserServices from "../Services/UserServices"

//Los controllers deben devolver el código de estado correspondiente para cada solicitud
export default class UserControllers { 
  static createUser(newUserData){
    return UserServices.createUserService(newUserData)
  }
  static getUserById(userId){
    return UserServices.getUserByIdService(userId)
  }
  static getAllUsers(){
    return UserServices.getAllUsersService()
  }
  static updateUserInfo(userId, updatedUserData){
    return UserServices.updateUserInfoService(userId, updatedUserData)
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
  static emptyCart(){
    return UserServices.emptyCartService()
  }
}