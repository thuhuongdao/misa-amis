<template>
  <div class="popup-wrapper">
    <div class="popup-content">
      <div class="popup-body">
        <div class="popup-icon info-icon"></div>
        <div class="popup-msg">
          Dữ liệu đã bị thay đổi. Bạn có muốn cất không?
        </div>
      </div>
      <div class="popup-footer info-footer">
        <base-white-button ref="btn-info" text="Huỷ" @click.native="$emit('cancel')" />

        <div class="right-info-footer">
          <base-white-button text="Không" @click.native="$emit('no')"/>
          <base-green-button class="btn-accept" text="Có" @click.native="$emit('yes')"/>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../../css/base/popup/popup.css";
@import "../../css/base/popup/info-popup.css";
</style>
<script>
import BaseGreenButton from "./BaseGreenButton.vue";
import BaseWhiteButton from "./BaseWhiteButton.vue";
export default {
  components: { BaseGreenButton, BaseWhiteButton },
  methods:{
      autoFocus: function(){
    this.$refs['btn-info'].autoFocus();
    }
  }
};
</script>
