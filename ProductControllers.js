const ProductServices = require("../Services/ProductServices");

class ProductControllers { 
  static addNewProduct(product){
    return //ProductServices.save(product);
  }
  static getProductById(productId){
    return //ProductServices.getById(productId);
  }
  static getAllProducts(){
    return //ProductServices.getAll();
  }
  static updateProduct(productId, updatedData){
    return //ProductServices.update(productId, updatedData);
  }
  static deleteProductById(productId){
    return //ProductServices.deleteById(productId);
  }
  static deleteAllProducts(){
    return //ProductServices.deleteAll();
  }
}

export default ProductControllers