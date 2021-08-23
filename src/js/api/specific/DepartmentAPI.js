import BaseAPI from '../base/BaseAPI'

class DepartmentAPI extends BaseAPI{
    constructor(){
        super();
        this.controller = 'api/v1/department';
    }
}

export default new DepartmentAPI();