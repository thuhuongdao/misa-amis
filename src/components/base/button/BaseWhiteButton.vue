<template>
    <button ref="white" class="white-button">{{text}}</button>
</template>
<style scoped>
@import '../../../css/base/button/button.css';
@import'../../../css/base/button/white-button.css';
</style>
<script>
export default {
    props:{
        text: String
    }
    

}
</script>