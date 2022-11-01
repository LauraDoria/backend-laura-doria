import {ProductsMongoose} from './mongooseProducts'

class productControllersMongoose { 
  static addNewProduct(newData){
    return ProductsMongoose.save(newData)
  }
  static getProductById(id){
    return ProductsMongoose.getById(id)
  }
  static getAllProducts(){
    return ProductsMongoose.getAll()
  }
  static updateProduct(id, updatedData){
    return ProductsMongoose.update(id, updatedData)
  }
  static deleteProductById(id){
    return ProductsMongoose.deleteById(id)
  }
  static deleteAllProducts(){
    return ProductsMongoose.deleteAll()
  }
}
  
export const ProductControllersMongoose = productControllersMongoose

