<template>
  <div class="dropdown">
    <div
      class="dropdown-header"
      :class="{'dropdown-active': isActive}"
    >
      <input
        type="text"
        readonly
        @focus="focusInput"
        @keyup="move"
        :value="content"
 
        @blur="blurInput"
      />
      <div class="arrow-wrapper" @mousedown="clickArrow">
        <div class="arrow" :class="[isDown ? 'arrow-down' : 'arrow-up']"></div>
      </div>
    </div>
    <div class="dropdown-content" v-show="isShow">
      <div
        class="dropdown-item"
        :class="{
          'dropdown-item-hover': hover.id == item.id,
          'dropdown-item-active': active == item.id,
        }"
        @mouseover="mouseOver(index)"
        @mousedown="select(index, $event)"
        v-for="(item, index) in goodsList"
        :key="item.id"
      >{{ item.name }}</div>
    </div>
  </div>
</template>
<style scoped>
@import "../../css/base/dropdown.css";
</style>
<script>
export default {
  
  data() {
    return {
      content: "10 bản ghi trên 1 trang",
      isActive: false,

      isDown: true,
      isShow: false,
    
      hover: {
        id: 0,
        index: 0,
      },
      active: 10,
      goodsList: [
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
      ],
    };
  },
  
  methods: {
    /**
     * xổ dropdown xuống
     *
     */
    openDropdown: function() {
      this.isDown = false;
      this.isShow = true;
    },
    /**
     * đóng dropdown lại
     */
    closeDropdown: function() {
      this.isDown = true;
      this.isShow = false;
    },
    /**
     * blur ra ngoài dropdown
     *
     */
    blurInput: function() {
      this.isActive = false;
      this.closeDropdown();

    },
    /**
     * focus vao input
     */
    focusInput: function() {
      console.log("focus");
      this.isActive = true;
      this.openDropdown();
      
      // tự động hover vào option đầu tiên
      this.hover.index = 0;
      this.hover.id = 10;
    },
    /**
     * tự động lọc khi nhập dữ liệu
     */
    move: function(event) {
      let keyCode = event.keyCode;

      if (keyCode == 40) {// ấn phím mũi tên xuống
        if (this.isShow == false) return; //khi dropdown đóng, không làm gì
        //hover vào option tiếp theo
        let index = (this.hover.index + 1) % this.goodsList.length;
        let id = this.goodsList[index].id;
        this.hover = {
          index,
          id,
        };
      } else if (keyCode == 38) {// ấn phím mũi tên lên
        if (this.isShow == false) return; //khi dropdown đóng, không làm gì
        //hover vào option bên trên
        let index = this.hover.index - 1;
        index = index < 0 ? this.goodsList.length - 1 : index;
        let id = this.goodsList[index].id;
        this.hover = {
          index,
          id,
        };
      } else if (keyCode == 13) {//ấn phím enter
        //nhập option được chọn vào input
        this.content = this.goodsList[this.hover.index].name;
        this.active = this.hover.id;
        this.closeDropdown();
        //this.$emit("blur", this.isError);
        this.$emit("select", this.active);
      } 
    },
    /**
     * hover vao cac item
     */
    mouseOver: function(index) {
      this.hover.index = index;
      this.hover.id = this.goodsList[index].id;
    },
    /**
     * click chọn item
     */
    select: function(index, event) {
      //nhập option được chọn vào input
      this.active= this.goodsList[index].id;
      this.content = this.goodsList[index].name;
      this.$emit("select", this.active);
      
      this.closeDropdown()
      event.preventDefault();
    },
    /**
     * click vào mũi tên
     */
    clickArrow: function(event) {
      console.log("click");
     
      if (this.isDown == true) {//nếu đang đóng
      console.log("mo");
        //active dropdown
        this.isActive = true;
        this.openDropdown();
     
        this.$refs.search.focus();
      } else {//nếu đang mở
        //đóng lại
        this.closeDropdown();
    
      }
      //chặn sự kiện blur khỏi input
      event.preventDefault();
    },
  },
};
</script>
