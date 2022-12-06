import ProductServices from '../Services/ProductServices'

export default class ProductControllers { 
  static addNewProduct(newProductData){
    return ProductServices.addNewProductService(newProductData)
  }
  static getProductById(productId){
    return ProductServices.getProductByIdService(productId)
  }
  static getAllProducts(){
    return ProductServices.getAllProductsService()
  }
  static updateProductInfo(productId, updatedProductData){
    return ProductServices.updateProductInfoService(productId, updatedProductData)
  }
  static deleteProductById(productId){
    return ProductServices.deleteProductByIdService(productId)
  }
  static deleteAllProducts(){
    return ProductServices.deleteAllProductsService()
  }
}