<template>

   
    <div class="context-menu"  :style="{left: left + 'px', top : top + 'px'}" >
        <div class="context-menu-item" @click="copyRow">Nhân bản</div>
        <div class="context-menu-item" @click="deleteRow">Xóa</div>
        
    </div>
                 
</template>
<style scoped>
@import '../../css/base/context-menu.css';
</style>
<script>
export default {
    props: ['top','left'],
    data(){
        return{
            isShowContext: false,
           
   
        }
    },
    methods:{
        /**
         * chọn xóa
         * CreatedBy : DTHUONG (22/8/2021)
         */
        
        deleteRow: function(){
            this.$emit('delete');
        },
        /**
         * chọn nhân bản
         * CreatedBy : DTHUONG (22/8/2021)
         */
        copyRow: function(){
            this.$emit('copy');
        }
    }

}
</script>