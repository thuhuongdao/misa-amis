<template>
    <div class="checkbox" :class="{'checkbox-active' : isChecked}" @click="check"> 
        <div class="checkmask" v-show="isChecked"></div>
    </div>
</template>
<style scoped>
@import '../../css/base/checkbox.css';
</style>
<script>
export default {
    props:['checked'],
    computed:{
        isChecked: {
            get(){
                return this.checked;

            },
            set(val){
                this.$emit('check', val);

            }
        }
    },

    methods:{
        /**
         * click  vào checkbox
         * CreatedBy : DTHUONG(22/8/2021)
         */
        check: function(){
            this.isChecked = !this.isChecked;
           
        }
    }
}
</script>