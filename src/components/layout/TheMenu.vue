<template>
    <div class="menu">
        <div class="logo-container">
            <a href="#" class="option"></a>
            <a href="#" class="logo">
                <img src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg" class="">
            </a>
        </div>
        <div class="menu-item-list">
            <menu-item v-for="(item,index) in menuItemList" :key="index" :icon="item.icon" :title="item.title" :isActive="index == activeId" :index="index" @new-active="activeId = $event" />
        </div>


    </div>
</template>
<style scoped>
@import '../../css/common/menu.css';
</style>
<script>
import MenuItem from './MenuItem.vue'
export default {
  components: { MenuItem },
    data(){
        return{
            
            activeId: null,

            menuItemList :[
                {
                    icon: 'overview',
                    
                    title:'Tổng quan',
                },
                {
                    icon: 'cash',
                    title:'Tiền mặt',
                },
                {
                    icon: 'deposit',
                    title:'Tiền gửi',
                },
                {
                    icon: 'buy',
                    title:'Mua hàng',
                },
                {
                    icon: 'sell',
                    title:'Bán hàng',
                },
                {
                    icon: 'bill-management',
                    title:'Quản lý hóa đơn',
                },
                {
                    icon: 'warehouse',
                    title:'Kho',
                },
                {
                    icon: 'tool',
                    title:'Công cụ dụng cụ',
                },
                {
                    icon: 'asset',
                    title:'Tài sản cố định',
                },
                {
                    icon: 'tax',
                    title:'Thuế',
                },
                {
                    icon: 'price',
                    title:'Giá thành',
                },
                {
                    icon: 'synthetic',
                    title:'Tổng hợp',
                },
                {
                    icon: 'budget',
                    title:'Ngân sách',
                },
                {
                    icon: 'report',
                    title:'Báo cáo',
                },
                {
                    icon: 'financial-analysis',
                    title:'Phân tích tài chính',
                },

                

                
            
            ]
        }
    }
}
</script>