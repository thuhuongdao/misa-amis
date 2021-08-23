<template>
    <div class="search-input" :class="{'active-search-input' : isActive}">
        <input type="text" v-model="inputValue"  @focus="isActive = true" @blur="isActive = false" placeholder="Tìm kiếm theo mã , tên nhân viên"/>
        <div class="search-icon" ></div>
    </div>    
</template>
<style scoped>
@import '../../../css/base/input/input.css';
@import '../../../css/base/input/search-input.css';
</style>
<script>
export default {
    props:{
        value: String,
    },
    data(){
        return{
            isActive: false
        }
    },
    computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  }
}
</script>