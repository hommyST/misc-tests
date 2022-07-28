<template>
  <div id="app">
    <h1>TinyMCE</h1>
    <TinyEditor msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import TinyEditor from './components/TinyEditor.vue'

export default {
  name: 'App',
  components: {
    TinyEditor
  }
}
</script>

<style>
h1 {
  text-align: center;
}
</style>
