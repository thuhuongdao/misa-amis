<template>
  <div class="modal">
    <div class="modal-content">
      <base-loading v-show="isLoading"/>
      <div class="modal-header">
        <div class="modal-title">
          <div class="title">Thông tin nhân viên</div>
          <div class="checkbox-wrapper">
            <base-checkbox :checked="isCustomer" @check="isCustomer = $event"/>
            <label for="customer" >Là khách hàng</label>
          </div>
          <div class="checkbox-wrapper">
            <base-checkbox :checked="isSupplier" @check="isSupplier = $event"/>
            <label for="supplier">Là nhà cung cấp</label>
          </div>
        </div>
        <div class="modal-utilities">
          <div class="curson-pointer btn-help" v-tooltip.bottom="'Giúp'"></div>
          <div class="curson-pointer btn-close" v-tooltip.bottom="'Đóng'" @click="closeX"></div>
        </div>
      </div>
      <div class="modal-body">
        <button class="btn-last" @focus="$refs['save-and-add'].autoFocus()"/>
        <div class="base-info">
          <div class="w-50 left-base">
            <div class="base-info-row flex-row">
              <div class="w-40 r-6 employee-code-wrapper">
                <div class="label">Mã <span class="red">*</span></div>
                <base-input
                  ref="employeeCode"
                  field="Mã không được phép để trống"
                  :status="true"
                  inputType="employeeCode"
                  :value="item.employeeCode"
                  @input="item.employeeCode = $event"
                />
              </div>
              <div class="w-60 fullname-wrapper">
                <div class="label">Tên <span class="red">*</span></div>
                <base-input
                  ref="employeeName"
                  field="Tên không được phép để trống"
                  :status="true"
                  inputType="employeeName"
                  :value="item.employeeName"
                  @input="item.employeeName = $event"
                />
              </div>
            </div>

            <div class="base-info-row">
              <div class="department-wrapper">
                <div class="label">Đơn vị <span class="red">*</span></div>
                <base-auto-combo-box
                  ref="department"
                  field="Đơn vị không được phép để trống"
                  type="department"
                  :value="item.departmentId"
                  :text="item.departmentName"
                  v-on:select="item.departmentId = $event"
                  v-on:select-name="item.departmentName = $event"
                />
              </div>
            </div>
            <div class="base-info-row">
              <div class="position-wrapper">
                <div class="label">Chức danh</div>
                <base-input
                  :status="false"
                  inputType="employeePosition"
                  :value="item.employeePosition"
                  @input="item.employeePosition = $event"
                />
              </div>
            </div>
          </div>
          <div class="w-50 right-base">
            <div class="base-info-row flex-row">
              <div class="w-40 r-16 date-of-birth-wrapper">
                <div class="label">Ngày sinh</div>
                <date-picker
                  v-model="item.dateOfBirth"
                  format="DD/MM/YYYY"
                  :clearable="false"
                  :disabled-date="(date) => date >= new Date()"
                  placeholder="DD/MM/YYYY"
                >
                  >

                  <template v-slot:footer="{ emit }">
                    <div>
                      <button
                        style="tex-align:center"
                        class="mx-btn mx-btn-text"
                        @click="emit(new Date())"
                      >
                        Today
                      </button>
                    </div>
                  </template>
                </date-picker>
              </div>
              <div class="w-60 gender-wrapper">
                <div class="label">Giới tính</div>
                <div class="radio-wrapper">
                  <base-radio
                    :active="item.gender"
                    @select="item.gender = $event"
                  />
                </div>
              </div>
            </div>

            <div class="base-info-row flex-row">
              <div class="w-60 r-6 identity-number-wrapper">
                <div class="label" v-tooltip= "'Số chứng minh thư nhân dân'">Số CMND</div>
                <base-input
                  ref="identityNumber"
                  field="Số CMND không hợp lệ"
                  :status="false"
                  inputType="identityNumber"
                  :value="item.identityNumber"
                  @input="item.identityNumber = $event"
                />
              </div>
              <div class="w-40 identity-date-wrapper">
                <div class="label">Ngày cấp</div>
                <date-picker
                  v-model="item.identityDate"
                  format="DD/MM/YYYY"
                  :clearable="false"
                  :disabled-date="(date) => date >= new Date()"
                  placeholder="DD/MM/YYYY"
                >
                  >

                  <template v-slot:footer="{ emit }">
                    <div>
                      <button
                        style="tex-align:center"
                        class="mx-btn mx-btn-text"
                        @click="emit(new Date())"
                      >
                        Today
                      </button>
                    </div>
                  </template>
                </date-picker>
              </div>
            </div>
            <div class="base-info-row">
              <div class="identity-place-wrapper">
                <div class="label">Nơi cấp</div>
                <base-input
                  :status="false"
                  inputType="identityPlace"
                  :value="item.identityPlace"
                  @input="item.identityPlace = $event"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="extend-info">
          <div class="base-info-row">
            <div class="address-wrapper">
              <div class="label">Địa chỉ</div>
              <base-input
                :status="false"
                inputType="address"
                :value="item.address"
                @input="item.address = $event"
              />
            </div>
          </div>
          <div class="base-info-row flex-row">
            <div class="w-25 r-6 phone-number-wrapper">
              <div class="label" v-tooltip="'Điện thoại di động'">ĐT di động</div>
              <base-input
                ref="phoneNumber"
                field="Số điện thoại di động không hợp lệ"
                :status="false"
                inputType="phoneNumber"
                :value="item.phoneNumber"
                @input="item.phoneNumber = $event"
              />
            </div>
            <div class="w-25 r-6 telephone-number-wrapper">
              <div class="label" v-tooltip="'Điện thoại cố định'">ĐT cố dịnh</div>
              <base-input
                :status="false"
                inputType="telephoneNumber"
                :value="item.telephoneNumber"
                @input="item.telephoneNumber = $event"
              />
            </div>
            <div class="w-25 email-wrapper">
              <div class="label">Email</div>
              <base-input
                ref="email"
                field="Email không hợp lệ"
                :status="false"
                inputType="email"
                :value="item.email"
                @input="item.email = $event"
              />
            </div>
          </div>
          <div class="base-info-row flex-row">
            <div class="w-25 r-6 bank-account-wrapper">
              <div class="label">Tài khoản ngân hàng</div>
              <base-input
                :status="false"
                inputType="bankAccountNumber"
                :value="item.bankAccountNumber"
                @input="item.bankAccountNumber = $event"
              />
            </div>
            <div class="w-25 r-6 bank-name-wrapper">
              <div class="label">Tên ngân hàng</div>
              <base-input
                :status="false"
                inputType="bankName"
                :value="item.bankName"
                @input="item.bankName = $event"
              />
            </div>
            <div class="w-25 bank-branch-name-wrapper">
              <div class="label">Chi nhánh</div>
              <base-input
                :status="false"
                inputType="bankBranchName"
                :value="item.bankBranchName"
                @input="item.bankBranchName = $event"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="footer-content">
          <div class="left-footer">
            <base-white-button text="Huỷ"  @click.native="close" @keyup.enter.native="close" />
          </div>
          <div class="right-footer">
            <base-white-button
              class="btn-save"
              text="Cất"
              @click.native="save(false)" @keyup.enter.native="save(false)"
            />
            <base-green-button ref="save-and-add" text="Cất và Thêm" @click.native="save(true)" @keyup.enter.native="save(true)" />
            <button class="btn-last" @focus="$refs.employeeCode.autoFocus()"/>

          </div>
        </div>
      </div>
    </div>
    <base-danger-popup
  
    
      v-show="isShowDanger"
      :text="dangerText"
      @close="closeDanger"
    />
    <base-warning-popup
  
      v-show="isShowWarning"
      :text="warningText"
      @ok="isShowWarning = false"
    />
    <base-info-popup
  
      v-show="isShowInfo"
      @yes="yesInfo"
      @no="noInfo"
      @cancel="cancelInfo"
    />
  </div>
</template>
<style scoped>
@import "../../../css/common/datepicker.css";

@import "../../../css/page/dialog.css";
</style>
<script>
import Vue from "vue";
import EmployeeAPI from '../../../js/api/specific/EmployeeAPI'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)


import msg from '../../../js/common/message';
import dialogMode from "../../../js/common/const";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import BaseAutoComboBox from "../../base/BaseAutoComboBox.vue";
import BaseGreenButton from "../../base/button/BaseGreenButton.vue";
import BaseWhiteButton from "../../base/button/BaseWhiteButton.vue";
import BaseInput from "../../base/input/BaseInput.vue";

import BaseRadio from "../../base/BaseRadio.vue";

import BaseDangerPopup from "../../base/popup/BaseDangerPopup.vue";
import BaseWarningPopup from "../../base/popup/BaseWarningPopup.vue";
import BaseInfoPopup from "../../base/popup/BaseInfoPopup.vue";

import BaseLoading from '../../base/BaseLoading.vue';
import BaseCheckbox from '../../base/BaseCheckbox.vue';


export default {
  components: {
    DatePicker,
    BaseInput,
    BaseAutoComboBox,
    BaseGreenButton,
    BaseWhiteButton,
    BaseRadio,
    BaseDangerPopup,
    BaseWarningPopup,
    BaseInfoPopup,
    BaseLoading,
    BaseCheckbox,
  },
  props: ["mode", "id"],
  data() {
    return {
      //trạng thái đang loading dữ liệu
      isLoading: false,
      //là khách hàng
      isCustomer: false,
      //là nhà cung cấp
      isSupplier: false,
      //số lần thay đổi trong form thông tin
      countChange: 0,
      //trạng thái đóng mở popup info
      isShowInfo: false,
      //trạng thái đóng mở popup cảnh báo dữ liệu không hợp lệ
      isShowDanger: false,
      //text truyền vào pop up cảnh báo
      dangerText: null,
      //trạng thái đóng mở popup cảnh báo đã tồn tại
      isShowWarning: false,
      //text truyền vào pop up cảnh báo đã tồn tại
      warningText: null,
      //trường không hợp lệ đầu tiên
      firstError: null,
      //shortcut date picker chọn ngày hiện tại
      shortcuts: [{ text: "Today", onClick: () => new Date() }],
      //thông tin nhân viên
      item: {
        employeeCode: "",
        employeeName: "",
        dateOfBirth: null,
        gender: null,
        departmentId: null,
        departmentName: "",
        identityNumber: "",
        identityDate: null,
        identityPlace: "",
        employeePosition: "",
        address: "",
        bankAccountNumber: "",
        bankName: "",
        bankBranchName: "",

        phoneNumber: "",
        telephoneNumber: "",
        email: "",
      },
    };
  },
 async created() {
  
    if (this.mode == dialogMode.Add) {//khi thêm nhân viên
      //lấy mã nhân viên mới
      this.getNewCode();
    } else if (this.mode == dialogMode.Edit) {//khi sửa thông tin nhân viên
      //lấy thông tin nhân viên theo id
      this.getById(this.id);
    } else {//khi nhân bản một nhân viên
      //lấy thông tin nhân viên theo id
    await   this.getById(this.id);
    //lấy mã nhân viên mới
    await this.getNewCode();
    }
  },
  mounted() {
    //tự độn focus vào ô input đầu tiên
    this.$refs.employeeCode.autoFocus();
  },
  watch: {
    //xem thông tin nhân viên đã bị thay đổi chưa
    item: {
      handler() {
        this.countChange = this.countChange + 1;
      },
      deep: true,
    },
  },

  methods: {
    /**
     * lấy mã nhân viên mới
     * CreatedBy : DTHUONG(21/8/2021)
     */
    getNewCode:async function() {
    await  EmployeeAPI.newCode()
        .then((res) => {
          this.item.employeeCode = res.data;
        })
        .catch((error) => {
          if(error.status == 500){
             
              this.openWarning(error.data.userMsg);
            }
        });
    },
    /**
     * lấy thông tin nhân viên thao id 
     * CreatedBy : DTHUONG(21/8/2021)
     */
    getById:async function(id) {
    await   EmployeeAPI.getById(id)
        .then((res) => {
          this.item = res.data;
          //format date về dạng object
          if (this.item.dateOfBirth != null) {
            this.item.dateOfBirth = new Date(this.item.dateOfBirth);
            this.item.dateOfBirth.setDate(this.item.dateOfBirth.getDate() + 1);
          }
          if (this.item.identityDate != null) {
            this.item.identityDate = new Date(this.item.identityDate);
            this.item.identityDate.setDate(
              this.item.identityDate.getDate() + 1
            );
          }
        })
        .catch((error) => {
          if(error.status == 500){
             
              this.openWarning(error.data.userMsg);
            }
        });
    },
     /**
     * gọi api thêm nhân viên
     * CreateBy: DTHUONG(20/8/2021)
     */
    add: async function(season) {
      //thông báo đang loading dữ liệu
      this.isLoading= true;
      //thêm nhân viên
      EmployeeAPI.create(this.item)
        .then((res) => {
          //thông báo đã load dữ liệu xong
          this.isLoading= false;
          
          if (res.status == 201) {
            if (season == true) {
              this.continueAdd();
            } else {
              this.close();
            }
            this.$emit("success", this.mode);
          } else if (res.status == 200) {
            if (res.data.success == false) {
              
              this.openWarning(res.data.userMsg + msg.ReCheck);
            }
          }
        })
        .catch((error) => {
          //thông báo đã load dữ liệu xong
          this.isLoading= false;
            if(error.status == 500){
             
              this.openWarning(error.data.userMsg);
            }
         
          
        });
    },
    /**
     * gọi api sửa thông tin nhân viên theo id
     * CreateBy: DTHUONG(20/8/2021)
     */
    edit: function(season) {
      //thông báo đang loading dữ liệu
      this.isLoading= true;
      //thực hiện sửa thông tin nhân viên
      EmployeeAPI.update(this.item)
        .then((res) => {
          //thông báo đã load xong
          this.isLoading= false;
          if (res.status == 200) {
            if (res.data.success == true) {
              if (season == true) {
                
                this.continueAdd();
              } else {
                this.close();
              }
              this.$emit("success", this.mode);
            }else{
              //thông báo lỗi
              this.openWarning(res.data.userMsg + msg.ReCheck);
            }
          }
        }).catch((error) => {
          //thông báo đã load xong
          this.isLoading= false;
          if(error.status == 500){
            //thông báo lỗi
              
              this.openWarning(error.data.userMsg);
            }
        });
    },
    /**
     * save khi lưu dữ liệu tiếp tục thêm mới
     * CreateBy: DTHUONG(21/8/2021)
     */
    continueAdd:function(){
      this.$emit("change-mode", dialogMode.Add);
      this.countChange = -1;
      this.item = {
        employeeCode: "",
        employeeName: "",
        dateOfBirth: null,
        gender: null,
        departmentId: null,
        departmentName: "",
        identityNumber: "",
        identityDate: null,
        identityPlace: "",
        employeePosition: "",
        address: "",
        bankAccountNumber: "",
        bankName: "",
        bankBranchName: "",
        phoneNumber: "",
        telephoneNumber: "",
        email: "",
      };

      this.getNewCode();
      this.$refs.employeeCode.autoFocus();
    },
    /**
     * lưu lại thông tin nhân viên
     * (có thể tiếp tục thêm mới)
     * CreatedBy : DTHUONG (19/8/2021)
     */
    save: function(value) {
      if (this.validate()) {
        if (this.validateDob(this.item.dateOfBirth) == false) {
          
          this.openWarning(msg.errorDob);
        } else {
          if (this.mode == dialogMode.Add) this.add(value);
          else if (this.mode == dialogMode.Edit) this.edit(value);
          else this.add(value);
        }
      } else {
        this.openDanger();
      }
      
      
    },
    /**
     * đóng form chi tiết
     * CreatedBy : DTHUONG (19/8/2021)
     * 
     */
    close: function() {
      this.$emit("close-dialog");
    },
    /**
     * click vào nút x đóng form
     * CreatedBy : DTHUONG (19/8/2021)
     */
    closeX: function() {
      if (this.mode == dialogMode.Add || this.mode == dialogMode.Edit) {
        if (this.countChange > 1) {
          this.openInfo();
        } else {
          this.close();
        }
      } else {
        if (this.countChange > 2) {
          this.openInfo();
        } else {
          this.close();
        }
      }
    },
    /**
     * validate thông tin nhập vào có hợp lệ không
     * CreatedBy : DTHUONG (21/8/2021)
     * 
     */
    validate: function() {
   
      let valid = true;

      for (let key in Object(this.$refs)) {
        
        if (this.$refs[key].blurInput && this.$refs[key].blurInput() == false) {
          if (valid == true) {
            valid = false;
            this.firstError = key;
            this.dangerText = this.$refs[key].field;
          }
        }
      }

      
      return valid;
    },
    /**
     * validate trường ngày sinh
     * nhân viên phải đủ 15 tuổi
     * CreatedBy : DTHUONG (21/8/2021)
     * 
     */
    validateDob(date) {
      if (date == null) return true;
      var currentDate = new Date();
      var dd = currentDate.getDate();
      var mm = currentDate.getMonth() + 1;
      var yyyy = currentDate.getFullYear();
      if (dd <= 9) dd = "0" + dd;
      if (mm <= 9) mm = "0" + mm;
      yyyy = yyyy - 15;
      var dateString = yyyy + "-" + mm + "-" + dd;
      var dateObj = new Date(dateString);
      if (date.getTime() > dateObj.getTime()) return false;
      return true;
    },
    /**
     * lưu dữ liệu và đóng form chi tiết
     * CreatedBy : DTHUONG (21/8/2021)
     */
    yesInfo: function() {
      
      this.isShowInfo = false;
      this.save();
    },
    /**
     * đóng form chi tiết mà không lưu dữ liệu
     * CreatedBy : DTHUONG (21/8/2021)
     */
    noInfo: function() {
      this.isShowInfo = false;
      this.close();
    },
    /**
     * hoãn không đóng form chi tiết nữa
     * CreatedBy : DTHUONG (21/8/2021)
     */
    cancelInfo: function() {
      this.isShowInfo = false;
    },
    /**
     * đóng popup cảnh báo thông tin không hợp lệ
     * tự động focus vào trường không hợp lệ đầu tiên
     * CreatedBy : DTHUONG (21/8/2021)
     */
    closeDanger: function() {
      this.isShowDanger = false;
      this.$refs[this.firstError].autoFocus();
    },
    /**
     * mở popup danger
     * CreatedBy : DTHUONG (22/8/2021)
     */
    openDanger: function(){
      
      this.isShowDanger = true;
     
      
    },
    /**
     * mở popup warning
     * CreatedBy : DTHUONG (22/8/2021)
     */
    openWarning: function(value){
      this.warningText = value;
      this.isShowWarning = true;
     

    },
    /**
     * mở popup info
     * CreatedBy : DTHUONG (22/8/2021)
     */
    openInfo: function(){
      this.isShowInfo = true;
     
    }
  },
};
</script>
