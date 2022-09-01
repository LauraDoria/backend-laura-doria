import {ProductsFirebase} from './firebaseProducts'

class productControllersFirebase { 
  static addNewProduct(newData){
    return ProductsFirebase.save(newData)
  }
  static getProductById(id){
    return ProductsFirebase.getById(id)
  }
  static getAllProducts(){
    return ProductsFirebase.getAll()
  }
  static updateProduct(id, updatedData){
    return ProductsFirebase.update(id, updatedData)
  }
  static deleteProductById(id){
    return ProductsFirebase.deleteById(id)
  }
  static deleteAllProducts(){
    return ProductsFirebase.deleteAll()
  }
}
  
export const ProductControllersFirebase = productControllersFirebase


