const {ProductServices} = require('../Services/ProductServices')

class ProductControllers { 
  static addNewProduct(productData){
    return ProductServices.addNewProductService(productData)
  }
  static getProductById(productId){
    return ProductServices.getProductByIdService(productId)
  }
  static getAllProducts(){
    return ProductServices.getAllProductsService()
  }
  static updateProductInfo(productId, productData){
    return ProductServices.updateProductInfoService(productId, productData)
  }
  static deleteProductById(productId){
    return ProductServices.deleteProductByIdService(productId)
  }
  static deleteAllProducts(){
    return ProductServices.deleteAllProductsService()
  }
}

module.exports = {ProductControllers}