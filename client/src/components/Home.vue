<template lang="html">
  <div class="">
    <h1>Mango tree Real Time</h1>
    <h2>Interval every 1 secs</h2>
    <button class="btn btn-primary btn-lg" @click="startGrow">Start</button>
    <h2><strong style="color:#27800c">{{status}}</strong></h2>
    <h1><strong style="color:red">{{dead}}</strong></h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      dead: '',
      status: ''
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    ...mapActions([
      'start'
    ]),
    startGrow () {
      this.$db.set({ dead: '', status: '' })
      this.start()
    },
    getData () {
      this.$db.on('value', (manggo) => {
        this.status = manggo.val().status
        this.dead = manggo.val().dead
      })
    }
  }
}
</script>

<style lang="css">
</style>
