<template>
  <div class="main-container">
    <Header></Header>
    <Schedule></Schedule>
  </div>
</template>

<script>
import Header from './Schedule/header.vue';
import Schedule from './Schedule/schedule.vue';

export default {
  components: {
    Header : Header,
    Schedule : Schedule
  },
  name: "schedule",
  data() {
    return {};
  }
};
</script>

<style scoped>

</style>
