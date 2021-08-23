import BaseAPIConfig from './BaseAPIConfig';

export default class BaseAPI {
    constructor(){
        this.controller = null;
    }

    /**
     * lất tất cả data
     * @returns 
     */
    getAll(){
        return BaseAPIConfig.get(`${this.controller}s`);
    }
  
    /**
     * thêm mới 1 bản ghi
     * @param {*} data 
     * @returns 
     */
    create(data){
        return BaseAPIConfig.post(`${this.controller}s`, data);
    }
    
    /**
     * update 1 bản ghi 
     * @param {*} data 
     * @returns 
     */
    update(data){
        return BaseAPIConfig.put(`${this.controller}s`, data);
    }
    /**
     * xóa 1 bản ghi theo id
     * @param {*} id 
     * @returns 
     */
    delete(id){
        return BaseAPIConfig.delete(`${this.controller}s/${id}`);
    }
    /**
     * lấy 1 bản ghi theo id
     * @param {*} id 
     * @returns 
     */
    getById(id){
        return BaseAPIConfig.get(`${this.controller}s/${id}`);
    }
}