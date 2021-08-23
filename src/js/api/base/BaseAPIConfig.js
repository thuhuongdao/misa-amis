import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
Vue.use(VueAxios, axios)
import APIConfig from '../config/APIConfig'

var BaseAPIConfig = axios.create({
    baseURL: APIConfig,
    headers: {'Content-type': 'application/json'}
})
export default BaseAPIConfig;