<template>
    <button ref="green" class="green-button">{{text}}</button>
</template>
<style scoped>
@import '../../../css/base/button/button.css';
@import'../../../css/base/button/green-button.css';
</style>
<script>
export default {
    props:{
        text: String
    }
    

}
</script>