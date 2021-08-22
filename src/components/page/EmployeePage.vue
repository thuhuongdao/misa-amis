<template>
  <div class="content" @click="clickOutSide">
    <div class="header-content">
      <div class="header-title">Nhân viên</div>
      <base-green-button text="Thêm mới nhân viên" @click.native="add"/>
    </div>
    <div class="body-content white-background">
      <div class=" filter">
        <base-search-input v-model="filter.employeeFilter"/>
        <div
          class="curson-pointer btn-refresh"
          v-tooltip="'Lấy lại dữ liệu'"
          data-title="Lấy lại dữ liệu"
          @click="loadData"
        ></div>
      </div>
      <div class="grid">
        <base-loading v-show="isLoading"/>
        <div class="table-wrapper ">

          <table class="table">
            <thead>
              <tr>
                <th class="mw-40 check"><base-checkbox :checked="isCheckAll"  @check="checkAll($event)"/></th>
                <th class="text-align-left mw-143 employeeCode">MÃ NHÂN VIÊN</th>
                <th class="text-align-left mw-250 employeeName">TÊN NHÂN VIÊN</th>
                <th class=" text-align-left mw-105 gender">GiỚI TÍNH</th>
                <th class=" mw-150 dateOfBirth">NGÀY SINH</th>
                <th class=" text-align-left mw-200 identityNumber">SỐ CMND</th>
                <th class=" text-align-left mw-250 employeePosition">CHỨC DANH</th>
                <th class=" text-align-left mw-250 departmentName">TÊN ĐƠN VỊ</th>
       
                <th class=" text-align-left mw-150 bankAccountNumber">
                  SỐ TÀI KHOẢN
                </th>
                <th class=" text-align-left mw-250 bankName">TÊN NGÂN HÀNG</th>
                <th class=" text-align-left mw-250 bankBrachName">
                  CHI NHÁNH TÀI KHOẢN NGÂN HÀNG
                </th>
               
             
                <th class="mw-120 feature">CHỨC NĂNG</th>
              </tr>
            </thead>
            <tbody>
              
              <tr @click="id = item.employeeId" v-for="(item) in employeeList" :key="item.employeeId" :class="{'active-row' : item.employeeId == id}">
                <td class="fw-40 check"><base-checkbox :checked="item.check" @check="checkOne(item,$event)"/></td>
                <td class="mw-143 employeeCode">{{ item.employeeCode }}</td>
                <td class="mw-250 employeeName">{{item.employeeName}}</td>
                <td class="mw-105 gender">{{genderName(item.gender)}}</td>
                <td class="mw-150 dateOfBirth text-align-center">{{ formatDate(item.dateOfBirth) }}</td>
                <td class="mw-200 identityNumber">{{item.identityNumber}}</td>
                <td class="mw-250 employeePosition">{{item.employeePosition}}</td>
                <td class="mw-250 departmentName">{{item.departmentName}}</td>
               
                <td class="mw-150 bankAccountNumber">{{item.bankAccountNumber}}</td>
                <td class="mw-250 bankName">{{item.bankName}}</td>
                <td class="mw-250 bankBrachName">{{item.bankBranchName}}</td>
              
               
                <td class="mw-120 feature" >
                  <div class="feature-box">
                    <button class="btn-edit" @click="edit(item.employeeId)">Sửa</button>
                     <button class="btn-context-menu" :ref="item.employeeId" @click="toggle(item.employeeId,item.employeeCode)"></button>
                    
                  </div>
                </td>
              </tr>
              
              

            </tbody>
          </table>
        </div>
        <div class="paging-bar">
          <div class="left-paging-bar">Tổng số: <b>{{totalRecord}}</b> bản ghi</div>
          <div class="right-paging-bar">
            <div class="pageSize-wrapper">
            <base-auto-combo-box
              class="curson-pointer pageSize"
              type="record"
              :value="filter.pageSize"
                  :text="pageSizeText"
                  v-on:select="filter.pageSize = $event"
                  v-on:select-name="pageSizeText = $event"
            />
         

          </div>
            <div class="paging">
              <div class="preview" @click="selectPre" :class="{'unactive-move' : filter.pageIndex == 1, 'curson-pointer' : filter.pageIndex != 1}">Trước</div>

              <div v-if="totalPage <= 5" class="pageIndex">  
                  <div @click="selectPage(index)" class="index" v-for="index in totalPage" :key="index" :class="{'active-index' : index == filter.pageIndex}" >{{index}}</div>
                </div>
              <div v-else-if="filter.pageIndex<=3" class="pageIndex">  
                  <div  @click="selectPage(index)" class="index" v-for="index in 4" :key="index" :class="{'active-index' : index == filter.pageIndex} " >{{index}}</div>
                  <div class="index">...</div>
                  <div  @click="selectPage(totalPage)" class="index" :class="{'active-index' : filter.pageIndex  == totalPage}">{{totalPage}}</div>
                </div>
              <div v-else-if="filter.pageIndex >= totalPage -2" class="pageIndex">  
                <div @click="selectPage(1)" class="index" :class="{'active-index' : filter.pageIndex  == 1}">1</div>
                <div class="index">...</div>
                  <div @click="selectPage(index + totalPage -4)" class="index" v-for="index in 4" :key="index" :class="{'active-index' : (index + totalPage -4) == filter.pageIndex}">{{index + totalPage -4 }}</div>
                </div>
              <div v-else class="pageIndex">
                <div @click="selectPage(1)" class="index" :class="{'active-index' : filter.pageIndex  == 1}">1</div>
                <div class="index">...</div>
                  <div @click="selectPage(index + filter.pageIndex -2)" class="index"  v-for="index in 3" :key="index" :class="{'active-index' : (index + filter.pageIndex -2) == filter.pageIndex}">{{index + filter.pageIndex -2}}</div>
                  <div class="index">...</div>
                  <div @click="selectPage(totalPage)" class="index" :class="{'active-index' : filter.pageIndex  == totalPage}">{{totalPage}}</div>
                </div>

              <div class="next" @click="selectNext" :class="{'unactive-move' : filter.pageIndex == totalPage,'curson-pointer' : filter.pageIndex != totalPage}">Sau</div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <employee-dialog v-if="isShowDialog" :mode="dialogMode" :id="id" @close-dialog="isShowDialog = false" @success="reload($event)" @change-mode="dialogMode = $event"/>
    <base-context-menu v-show="isShowContext" :top="top" :left ="left"  @delete="isShowConfirm = true" @copy="copy"/>
    <base-confirm-popup v-show="isShowConfirm" :text="contextMenuCode" @yes="del" @no="isShowConfirm = false"/>
  </div>

</template>
<style scoped>

@import "../../css/base/button/button.css";
@import '../../css/common/z-index.css';
@import "../../css/common/width.css";
@import "../../css/common/content.css";
@import "../../css/page/header-content.css";
@import "../../css/page/filter.css";
@import "../../css/page/table.css";
@import "../../css/page/paging-bar.css";
</style>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
import VTooltip from 'v-tooltip'
Vue.use(VTooltip);

import dialogMode from "../../js/common/const";
import format from "../../js/common/format";
import BaseLoading from "../base/BaseLoading.vue";
import BaseAutoComboBox from "../base/BaseAutoComboBox.vue";
import BaseGreenButton from "../base/BaseGreenButton.vue";
import BaseSearchInput from "../base/BaseSearchInput.vue";
import EmployeeDialog from './EmployeeDialog.vue';
import BaseContextMenu from '../base/BaseContextMenu.vue';
import BaseConfirmPopup from '../base/BaseConfirmPopup.vue';
import BaseCheckbox from '../base/BaseCheckbox.vue';

export default {
  components: { BaseGreenButton, BaseSearchInput, BaseAutoComboBox, EmployeeDialog,
   BaseContextMenu,BaseLoading,
    BaseConfirmPopup,
    BaseCheckbox
    },
  data() {
    return {

      //hiển thị loading khi đang load dữ liệu
      isLoading : false,
      //tất cả các checkbox có checked không
      isCheckAll : false,
      //số lượng checkbox đã checked
      cntCheck: 0,
      //hiển thị popup xác nhận chắc chắn muốn xóa dữ liệu
      isShowConfirm: false,

      //hiển thị menu-context
      isShowContext : false,
      //id nhân viên context menu hiện tại trỏ đến
      contextMenuId: null,
      //mã nhân viên context menu hiện tại trỏ đến
      contextMenuCode: null,
      //vị trí của context menu
      top:0,
      left: 0,
      //danh sách nhân viên 
      employeeList: null,
      //danh sách giới tính
      genderList: ["Nam", "Nữ","Khác"],
      //hiển thị dialog 
      isShowDialog : false,
      //trạng thái dialog thêm , xóa hay nhân bản
      dialogMode : null,
      //id nhân viên truyền vào dialog
      id: null,
      //số lượng bản ghi 1 trang dạng string
      pageSizeText: "10 bản ghi 1 trang",
      filter : {
        // từ khóa tìm kiếm
        employeeFilter: "",
        //trang hiện tại
        pageIndex: 1,
        //số lượng bản ghi 1 trang
        pageSize: 10,
         
      },
      //tổng số trang
      totalPage:null,
      //tổng số bản ghi
      totalRecord:null,
      //true - không có trang trước trang hiện tại
      unactivePre: null,
      //true - không có trang sau trang hiện tại
      unactiveNext: null
      
   
    };
  },
  created() {
    this.loadData();
  },
computed:{
    //từ khóa tìm kiếm
   employeeWatch: function(){
     return this.filter.employeeFilter;
   },
   //số lượng bản ghi 1 trang
   pageSizeWatch: function(){
     return this.filter.pageSize;
   }
 },
 watch:{
   /**
    * load lại dữ liệu khi nhập từ khóa tìm kiếm
    * trả về trang đầu tiên  
    * CreatedBy: DTHUONG (22/8/2021)
    */
   employeeWatch: function(){
     this.filter.pageIndex = 1;
     this.loadData();
   },
   /**
    * load lại dữ liệu khi thay đổi số lượng bản ghi trên 1 trang
    * trả về trang đầu tiên  
    * CreatedBy: DTHUONG (22/8/2021)
    */
   pageSizeWatch:function(){

     this.filter.pageIndex = 1;
     this.loadData();
   }
 },
 

  methods:{

    /**
     * load danh sách nhân viên
     * CreatedBy: DTHUONG (20/8/2021)
     */
    loadData: function() {
     
      //hiển thị đang loading dữ liệu 
      this.isLoading= true;
      //load dữ liệu
      axios
        .get("https://localhost:44389/api/v1/employees/filter", {params : this.filter})
        .then((response) => {
          //lấy data trả về 
          var result  = response.data ;
          this.employeeList = result.data;
          this.totalPage = result.totalPage;
          this.totalRecord = result.totalRecord;
          //đã load xong dữ liệu
          this.isLoading= false;
          

        })
        .catch(() => {
         
          //đã load xong dữ liệu
          this.isLoading= false;
          
        });

  },
  /**
   * load lại dữ liệu sau khi thêm, sửa, nhân bản
   * CreatedBy: DTHUONG (21/8/2021)
   */
  reload: function(value){
    
    if(value == dialogMode.Add|| value == dialogMode.Copy){
      this.filter.pageIndex = 1;
       
    }
    this.loadData();
  },
  /**
   * chọn trang khác
   * CreatedBy: DTHUONG (21/8/2021)
   */
  selectPage: function(value){

    this.filter.pageIndex = value;
    this.loadData();
  },
  /**
   * chọn trang ngay trước trang hiện tại
   * CreatedBy: DTHUONG (21/8/2021)
   */
  selectPre: function(){
  
    if(this.filter.pageIndex==1) return;
    this.filter.pageIndex= this.filter.pageIndex -1;
    this.loadData();
  },
  /**
   * chọn trang ngay sau trang hiện tại
   * CreatedBy: DTHUONG (21/8/2021)
   */
  selectNext: function(){

    if(this.filter.pageIndex == this.totalPage) return;
    this.filter.pageIndex= this.filter.pageIndex +1;
    this.loadData();
  },
  /**
   * chọn thêm nhân viên
   * CreatedBy: DTHUONG (20/8/2021)
   */
  add:function(){
  
      this.dialogMode = dialogMode.Add;
      this.isShowDialog = true;
  },
  /**
   * chọn sửa thông tin nhân viên
   * CreatedBy: DTHUONG (20/8/2021)
   */
  edit: function(id){
    
    this.dialogMode = dialogMode.Edit;
    this.id = id;
    this.isShowDialog = true;

  },
  /**
   * chọn nhân bản 1 nhân viên
   * CreatedBy: DTHUONG (21/8/2021)
   */
  copy: function(){
 
    this.dialogMode = dialogMode.Copy;
    this.id = this.contextMenuId;
    this.isShowDialog = true;
  },
  
  /**
   * xóa nhân viên
   * CreatedBy: DTHUONG (21/8/2021)
   */
  del: function(){
    //xác nhận có chắc chắn muốn xóa không
    this.isShowConfirm = false;
    //thực hiện xóa nhân viên

    axios
        .delete("https://localhost:44389/api/v1/employees/" + this.contextMenuId)
        .then(() => {
          this.loadData();

        })
        .catch(() => {
         
        });
  },
  

  /**
   * hiển thị giới tính theo dạng text
   * CreatedBy: DTHUONG (20/8/2021)
   */
  genderName : function(value){
      if(value == null) return "";
      else return this.genderList[value];
    },
    /**
     * format date theo định dạng dd/mm/yyyy
     * CreatedBy: DTHUONG (20/8/2021)
     */
  formatDate : function(value){
      
      return format.formatDate(value);
    },
  /**
   * format định dạng tiền tệ
   * dạng z.zzz.zzz
   * CreatedBy: DTHUONG (20/8/2021)
   */
  formatMoney : function(value){
    return format.formatMoney(value);
  },
  /**
   * chọn tất cả checkbox
   * CreatedBy: DTHUONG (22/8/2021)
   */
  checkAll:function(value){
    this.isCheckAll = value;
    for(let item of this.employeeList){
      item.check = value;


    }
    if(value == true) this.cntCheck = this.filter.pageSize;
    else this.cntCheck = 0;

  },
  /**
   * chọn 1 checkbox
   * CreatedBy: DTHUONG (22/8/2021)
   */
  checkOne: function(item,value){
    item.check = value;
    if(value == false){
      this.isCheckAll = false;
      this.cntCheck -= 1;
    }else{
      this.cntCheck += 1;
      if(this.cntCheck == this.filter.pageSize) this.isCheckAll = true;
    }

  },
  
  /**
   * đóng , mở context menu
   * CreatedBy: DTHUONG (22/8/2021)
   */
  toggle: function(id,code){
    //nếu context menu đang đóng
    if(this.isShowContext == false){
      this.contextMenuId = id;
      this.contextMenuCode = code;
      console.log(this.$refs[id]);
      
      this.left = this.$refs[id][0].getBoundingClientRect().left - 70;
      this.top = this.$refs[id][0].getBoundingClientRect().top + 26;
      this.isShowContext = true;

    }else{//nếu context menu đang mở
        if(id == this.contextMenuId){
          this.isShowContext = false;

        }else{
          this.contextMenuId = id;
           this.contextMenuCode = code;
          this.left = this.$refs[id][0].getBoundingClientRect().left - 70;
          this.top = this.$refs[id][0].getBoundingClientRect().top + 26;
        }
    }
  },
  /**
   * đóng context menu khi click ra ngoài (trừ button để show context menu)
   * CreatedBy: DTHUONG (22/8/2021) 
   */
  clickOutSide: function(event){
      if(!event.target.classList.contains('btn-context-menu')){
                this.isShowContext = false;
            }
    },
  

  }
  
}
</script>
