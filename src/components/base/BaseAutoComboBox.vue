<template>
  <div class="combobox" v-tooltip="isError ? field : ''">
    <div
      class="combobox-header"
      :class="{ 'combobox-active': isActive, 'combobox-error': isError }"
    >
      <input
        type="text"
        ref="search"
        @focus="focusInput"
        v-on:keyup="autoSearch"
        v-model="searchContent"
        autocomplete="off"
        @blur="blurInput"
      />
      <div class="arrow-wrapper" @mousedown="clickArrow">
        <div class="arrow" :class="[isDown ? 'arrow-down' : 'arrow-up']"></div>
      </div>
    </div>
    <div class="combobox-content" :class="[(type == 'record') ? 'direction-up' : 'direction-down']" v-show="isShow">
      <div
        class="combobox-item"
        :class="{
          'combobox-item-hover': hover.id == item.id,
          'combobox-item-active': active == item.id,
        }"
        @mouseover="mouseOver(index)"
        @mousedown="select(index, $event)"
        v-for="(item, index) in filtered"
        :key="item.id"
      >{{ item.name }}</div>
    </div>
  </div>
</template>
<style scoped>

@import "../../css/base/combobox.css";
</style>
<script>
import Vue from 'vue'
import DepartmentAPI from '../../js/api/specific/DepartmentAPI'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip);

export default {
  props: ['type','value','text','field'],
  data() {
    return {
      
      
      isActive: false,
      isError: false,
      isDown: true,
      isShow: false,
      filtered: [],
      hover: {
        id: 0,
        index: 0,
      },
  
      goodsList: [],
    };
  },
  computed:{
    active: {
      get(){
        return this.value;

      },
      set(val){
        this.$emit("select", val);
      }
    },
    searchContent:{
      get(){
        return this.text;

      },
      set(val){
        this.$emit("select-name", val);
      }
    }
  },
  created: function() {
   
   //load dữ liệu của combobox
    if (this.type == "record") {
      this.goodsList = [
        {
          id: 10,
          name: "10 bản ghi trên 1 trang",
        },
        {
          id: 20,
          name: "20 bản ghi trên 1 trang",
        },
        {
          id: 30,
          name: "30 bản ghi trên 1 trang",
        },
        {
          id: 50,
          name: "50 bản ghi trên 1 trang",
        },
        {
          id: 100,
          name: "100 bản ghi trên 1 trang",
        },
      ];
    }else if(this.type == 'department'){
      DepartmentAPI.getAll()
      .then((res) => {
        for(let element of res.data){

          this.goodsList.push({
            id: element.departmentId,
            name: element.departmentName,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    }
    
   
  },
  methods: {
    /**
     * focus vào input
     * CreatedBy : DTHUONG(20/8/2021)
     */
    autoFocus: function(){
      this.$refs.search.focus();
    },
    /**
     * xổ combobox xuống
     *CreatedBy : DTHUONG(20/8/2021)
     */
    openCombobox: function() {
      this.isDown = false;
      this.isShow = true;
    },
    /**
     * đóng combobox lại
     * CreatedBy : DTHUONG(20/8/2021)
     */
    closeCombobox: function() {
      this.isDown = true;
      this.isShow = false;
    },
    /**
     * blur ra ngoài combobox
     * CreatedBy : DTHUONG(20/8/2021)
     *
     */
    blurInput: function() {
      this.isActive = false;
      this.closeCombobox();
     // this.$emit("blur", this.isError);
      if(this.active == null) {
        this.isError = true;
        return false;
      }
      return true;
    },
    /**
     * focus vao input
     * CreatedBy : DTHUONG(20/8/2021)
     */
    focusInput: function() {
   
      this.isActive = true;
      this.openCombobox();
      this.filtered = this.goodsList;
      // tự động hover vào option đầu tiên
      this.hover.index = 0;
      this.hover.id = this.filtered[0].id;
    },
    /**
     * tự động lọc khi nhập dữ liệu
     * CreatedBy : DTHUONG(20/8/2021)
     */
    autoSearch: function(event) {
      let keyCode = event.keyCode;

      if (keyCode == 40) {// ấn phím mũi tên xuống
        if (this.isShow == false) return; //khi combobox đóng, không làm gì
        //hover vào option tiếp theo
        let index = (this.hover.index + 1) % this.filtered.length;
        let id = this.filtered[index].id;
        this.hover = {
          index,
          id,
        };
      } else if (keyCode == 38) {// ấn phím mũi tên lên
        if (this.isShow == false) return; //khi combobox đóng, không làm gì
        //hover vào option bên trên
        let index = this.hover.index - 1;
        index = index < 0 ? this.filtered.length - 1 : index;
        let id = this.filtered[index].id;
        this.hover = {
          index,
          id,
        };
      } else if (keyCode == 13) {//ấn phím enter
        //nhập option được chọn vào input
        this.searchContent = this.filtered[this.hover.index].name;
        this.active = this.hover.id;
        this.closeCombobox();
        
      } else {//nhập kí tự vào input
        /**
         * lọc theo dữ liệu nhập vào
         */
        let val = this.searchContent.toLowerCase();
        this.filtered = this.goodsList.filter(function(good) {
          return good.name.toLowerCase().includes(val);
        });
        this.openCombobox();
        /**
         * không có option thoả mãn , error
         */
        if (!this.filtered.length) {
          this.isError = true;
          return;
        }
        this.isError = false;
        /**
         * hover id vượt quá số lượng filter dc
         * hover lại vào option đầu tiên
         */
        if (this.hover.index >= this.filtered.length) {
          this.hover.index = 0;
          this.hover.id = this.filtered[0].id;
        } else {
          const id = this.filtered[this.hover.index].id;
          this.hover.id = id;
        }
      }
    },
    /**
     * hover vao cac item
     * CreatedBy : DTHUONG(20/8/2021)
     */
    mouseOver: function(index) {
      this.hover.index = index;
      this.hover.id = this.filtered[index].id;
    },
    /**
     * click chọn item
     * CreatedBy : DTHUONG(20/8/2021)
     */
    select: function(index, event) {
      //nhập option được chọn vào input
      this.active= this.filtered[index].id;
      this.searchContent = this.filtered[index].name;
     
      //không còn lỗi nữa
      this.isError = false;
      this.closeCombobox()
      event.preventDefault();
    },
    /**
     * click vào mũi tên
     * CreatedBy : DTHUONG(20/8/2021)
     */
    clickArrow: function(event) {
      
     
      if (this.isDown == true) {//nếu đang đóng
     
        //active combobox
        this.isActive = true;
        this.openCombobox();
        this.filtered = this.goodsList;
        this.$refs.search.focus();
      } else {//nếu đang mở
        //đóng lại
        this.closeCombobox();
    
      }
      //chặn sự kiện blur khỏi input
      event.preventDefault();
    },
  },
};
</script>
