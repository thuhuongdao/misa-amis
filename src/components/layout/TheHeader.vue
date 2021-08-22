<template>
    <div class="header">
        <div class="left-header">
            <div class="curson-pointer bar-icon"></div>
            <div class="curson-pointer header-branch">
                <div class="header-branch-name" v-tooltip.bottom="'CÔNG TY CỔ PHẦN MISA'">CÔNG TY CỔ PHẦN MISA</div>
                <div class="header-branch-arrow"></div>
            </div>
        </div>
        <div class="right-header">
            <div class="curson-pointer icon-wrapper" v-tooltip.bottom="'Thông báo'"><div class="bell-icon"></div></div>
            
            <div class="curson-pointer user">
                <div class="avatar"></div>
                <div class="username">Đào Thu Hương</div>
                <div class="user-arrow "></div>
            </div>
        </div>
    </div>
</template>
<style scoped>

@import '../../css/common/header.css';
</style>
<script>
import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
export default {
    
}
</script>