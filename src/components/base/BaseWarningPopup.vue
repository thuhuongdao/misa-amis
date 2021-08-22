<template>
    <div class="popup-wrapper">
        <div class="popup-content">
            <div class="popup-body">
                <div class="popup-icon warning-icon"></div>
                <div class="popup-msg">{{text}}</div>
            </div>
            <div class="popup-footer warning-footer">
                <base-green-button ref='btn-warning' text="Đồng ý" @click.native="$emit('ok')"/>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import '../../css/base/popup/popup.css';
@import '../../css/base/popup/warning-popup.css';
</style>
<script>
import BaseGreenButton from './BaseGreenButton.vue'
export default {
  components: { BaseGreenButton },
  props:{
      text: String,
  },

  methods:{
      autoFocus: function(){
    this.$refs['btn-warning'].autoFocus();
  },
  }
    
}
</script>