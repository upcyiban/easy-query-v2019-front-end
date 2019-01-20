<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    document.title = '易查询'
  }
}
</script>

<style>

</style>
