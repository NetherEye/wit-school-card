<template>
  <div style="height:667px;margin: 100px auto;position: relative;">
    <img style="width: 70%;margin: 0 auto;display: block;" src="../../assets/school_img/title.png" alt="">
    <div @click="quit" style="widht:4%;float: right;margin-right:30px;position: absolute;top:10px;right: 31%;width: 4%;cursor: pointer;"></div><img src="../../assets/school_img/logout.png" alt="" @click="quit">
  </div>
</template>

<script>
import fetch from '@/assets/http/fetch';
import allApi from '@/assets/api/school';
export default {
  data () {
    return {

    }
  },
  methods: {
    quit () {
      fetch.get(allApi.logout, '', res => {
        if (res.code == 200) {
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = res.data
        }
      })
    },
  }
}
</script>

<style scoped>
</style>