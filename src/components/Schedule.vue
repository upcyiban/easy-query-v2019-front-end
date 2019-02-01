<template>
  <div class="main-container">
    <Header />
    <Schedule />
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
    return {
    };
  },
  created () {
    
  },
  mounted () {

  },
  methods: {

  },
};
</script>

<style scoped>
.main-container {
  width: 100%;
  height: 100%;
}
</style>
