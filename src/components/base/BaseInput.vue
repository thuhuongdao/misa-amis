<template>
  <input
    ref="input"
    class="input"
    :class="{ 'active-input': active, 'error-input': error }"
    v-tooltip.bottom="error ? field: '' "
    type="text"
    v-model="inputValue"
    @focus="focusInput"
    @keypress="keyPress"
    @blur="blurInput"
  />
</template>
<style scoped>
@import "../../css/base/input/input.css";
</style>
<script>
import Vue from "vue";
import VTooltip from 'v-tooltip'
Vue.use(VTooltip);
export default {
  props: {
    status: Boolean,
    inputType: String,
    value: String,
    field: String,
  },
  data() {
    return {
      active: false,
      error: false,

    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        if (this.status == true) {
          if (val == "") {
            this.error = true;
            


          }else{
            this.error = false;
         
          }
        }else{
          if (val == "") {
            this.error = false;
      

          }else{
            if (this.inputType == "email") {
              let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!reg.test(val.toLowerCase())) {
                this.error = true;
               

          
              }else{
                this.error = false;
                this.errorMsg = "";
              }
            }else if (this.inputType == "phoneNumber") {
              let reg = /((84|0)[3|5|7|8|9])+([0-9]{8})\b/;
              if (!reg.test(val)) {
                this.error = true;
                
              }else{
                this.error = false;
            
              }
            }else if (this.inputType == "identityNumber") {
              if (val.length != 9 && val.length != 12) {
                this.error = true;
                
              }else{
                this.error = false;
                
              }
            }


          }

        }
      }
    }
  },
  methods: {
    autoFocus: function() {
      this.$refs.input.focus();
    },
    focusInput: function() {
      console.log("focus");
      // this.error = false;
      this.active = true;
    },
    keyPress: function(event) {
      if (
        this.inputType == "identityNumber" ||
        this.inputType == "phoneNumber" ||
        this.inputType == "bankAccountNumber"
      ) {
        if (event.keyCode < 48 || event.keyCode > 57) {
          event.preventDefault();
        }
      }
    },
    blurInput: function() {
      this.active = false;
      
      if (this.status == true) {
        if (this.inputValue == "") {
          this.error = true;
    

          return false;
        }
      }
      if (this.inputValue == "") return true;
      if (this.inputType == "email") {
        let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(this.inputValue.toLowerCase())) {
          this.error = true;
      

          return false;
        }
      }
      if (this.inputType == "phoneNumber") {
        let reg = /((84|0)[3|5|7|8|9])+([0-9]{8})\b/;
        if (!reg.test(this.inputValue)) {
          this.error = true;
        

          return false;
        }
      }
      if (this.inputType == "identityNumber") {
        if (this.inputValue.length != 9 && this.inputValue.length != 12) {
          this.error = true;
         

          return false;
        }
      }

      return true;
    },
  },
}
</script>
