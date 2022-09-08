import fakerFunctions from '../../utils/fakerTestFunctions'

class controllersTest { 
    static getById(id){
      return fakerFunctions.getById(id);
    }
    static getAll(){
        return fakerFunctions.getAll;
    }
}

export default controllersTest