<template>
  <div id="app">
    <div class="world">
      <TheMenu/>
      <div class="wrapper">
        <TheHeader/>
        <EmployeePage/>
        
      </div>
    </div>
  </div>
</template>

<script>
import TheMenu from './components/layout/TheMenu.vue'
import TheHeader from './components/layout/TheHeader.vue'
import EmployeePage from './components/view/employee/EmployeePage.vue'

export default {
  name: 'App',
  components: {
    TheMenu,
    TheHeader,
    EmployeePage
    
  }
}
</script>

<style>
@import './css/common/main.css';

@import './css/base/tooltip.css';

@import './css/common/background.css';
@import './css/common/text-align.css';
@import './css/common/curson.css';


@import './css/common/world.css';
@import './css/common/wrapper.css';

</style>
