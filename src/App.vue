<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/beers">Give me a beer!</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    makeItTurn () {
      this.isTurning = !this.isTurning
      setTimeout(() => {
        this.isTurning = !this.isTurning
      }, 1000)
    }
  },
  data () {
    return {
      isTurning: false
    }
  }
}
</script>
