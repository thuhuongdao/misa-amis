<template>
    <div class="loading-wrapper">
        <object :data="loaderUrl"></object>
    </div>
</template>
<style scoped>
@import '../../css/base/loading.css';

</style>
<script>
export default {
    data(){
        return{
            loaderUrl : require('../../assets/loading.svg'),
        }
    }
}
</script>