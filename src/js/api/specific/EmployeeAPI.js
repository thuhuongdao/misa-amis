import BaseAPI from '../base/BaseAPI'
import BaseAPIConfig from '../base/BaseAPIConfig'
class EmployeeAPI extends BaseAPI{
    constructor(){
        super(); 
        this.controller = 'api/v1/employee';
    }

    filter(param){

            return BaseAPIConfig.get(`${this.controller}s/filter`, {
            params: param
        })
    }

    newCode(){
        return BaseAPIConfig.get(`${this.controller}s/newcode`);
    }

    
}

export default new EmployeeAPI();