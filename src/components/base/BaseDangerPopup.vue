<template>
  <div class="popup-wrapper">
    <div class="popup-content">
      <div class="popup-body">
        <div class="popup-icon danger-icon"></div>
        <div class="popup-msg">{{ text }}</div>
      </div>
      <div class="popup-footer danger-footer">
        <base-green-button
          ref="btn-danger"
          text="Đóng"
          @click.native="$emit('close')"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "../../css/base/popup/popup.css";
@import "../../css/base/popup/danger-popup.css";
</style>
<script>
import BaseGreenButton from "./BaseGreenButton.vue";
export default {
  components: { BaseGreenButton },
  props: {
    text: String,
  },
  methods: {
    autoFocus: function() {
      this.$refs['btn-danger'].autoFocus();
    },
  },
};
</script>
