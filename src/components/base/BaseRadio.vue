<template>
    <div>
        <div class="radio-group">
            <!-- <div class="radio-option">
                    <button class="radio" :class="{'active-radio' : activeId == 0}" @click="activeId = 0" @keyup.enter="activeId = 0"><div></div></button>
                    <label >Nam</label>
                  </div>
                  <div class="radio-option">
                    <button class="radio" :class="{'active-radio' : activeId == 1}" @click="activeId = 1" @keyup.enter="activeId = 1"><div></div></button>
                    <label >Nữ</label>
                  </div>\
                  <div class="radio-option" >
                    <button class="radio" :class="{'active-radio' : activeId == 2}" @click="activeId = 2" @keyup.enter="activeId = 2"><div></div></button>
                    <label >Khác</label>
                  </div> -->
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