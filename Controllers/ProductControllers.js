const ProductServices = require("../Services/ProductServices");

class ProductControllers { 
  static addNewProduct(product){
    return products.save(product);
  }
  static getProductById(productId){
    return products.getById(productId);
  }
  static getAllProducts(){
    return products.getAll();
  }
  static updateProduct(productId, updatedData){
    return products.update(productId, updatedData);
  }
  static deleteProductById(productId){
    return products.deleteById(productId);
  }
  static deleteAllProducts(){
    return products.deleteAll();
  }
}

export default ProductControllers