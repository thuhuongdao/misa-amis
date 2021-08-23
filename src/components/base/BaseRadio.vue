<template>
    <div>
        <div class="radio-group">
            
                <div v-for="(item,index) in data" :key="index" class="radio-option">
                    <button class="radio" :class="{'active-radio' : activeId == index}" @click="activeId = index" @keyup.enter="activeId = index"><div></div></button>
                    <label>{{item}}</label>
                  </div>
        </div>
    </div>
</template>
<style scoped>
@import '../../css/base/radio.css';
</style>
<script>
export default {
    props: {
        active : Number,
    },
    data() {
      return {
        data:['Nam','Nữ','Khác'],
    
      }
    },
    computed: {
    activeId: {
      get() {
        return this.active;
      },
      set(val) {
        this.$emit("select", val);
      },
    },
  },
}
</script>