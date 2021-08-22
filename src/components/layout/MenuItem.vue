<template>
    <a href="#" class="menu-item" :class="{active : isActive}" @click="activate">
        
        <div class="menu-item-icon" :class="[icon, isActive ? iconActive : '']"  ></div>
        <div class="menu-item-title">{{title}}</div>
    </a>
</template>
<style scoped>
@import '../../css/common/menu-item.css';
</style>
<script>
export default {
    props: {
        icon : String,
        title : String,
        isActive: Boolean,
        index : Number,
    },
   
    computed: {
        iconActive: function(){
            return this.icon + "-active";
        }
    },
    methods :{
        /**
         * click chọn menu item 
         * CreatedBy : DTHUONG(19/8/2021)
         */
        activate: function(){
            this.$emit('new-active', this.index);
        }
    }
}
</script>