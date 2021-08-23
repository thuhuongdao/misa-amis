<template>
    <div class="popup-wrapper">
        <div class="popup-content">
            <div class="popup-body">
                <div class="popup-icon warning-icon"></div>
                <div class="popup-msg"> Bạn có thực sự muốn xóa nhân viên  {{text}} Không? </div>
            </div>
            <div class="popup-footer confirm-footer">
                <base-white-button text="Không" @click.native="$emit('no')"/>
                <base-green-button text="Có" @click.native="$emit('yes')"/>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import '../../../css/base/popup/popup.css';
@import '../../../css/base/popup/confirm-popup.css';
</style>
<script>
import BaseGreenButton from '../button/BaseGreenButton.vue'
import BaseWhiteButton from '../button/BaseWhiteButton.vue'
export default {
  components: { BaseGreenButton, BaseWhiteButton },
  props:{
      
      text: String,
  }
    
}
</script>