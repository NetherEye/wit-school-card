<template>
  <div id="header">
    <div class="left">
      <h1 style="display: block;">
        <a href="#" style="display: none;">智慧班牌</a>
        <img src="../assets/school_img/logo.png" />
      </h1>
    </div>
    <div class="right">
      <span @click="logout">退出</span>
    </div>
    <div class="center01" @click="skip" v-if="this.rolemi=='教师'">
      <span>{{Class}}</span>
    </div>
    <div class="center">
      <span>{{role}}</span>
    </div>
  </div>
</template>

<script>
import fetch from '@/assets/http/fetch';
import allApi from '@/assets/api/school';
export default {
  data () {
    return {
      role: '',
      Class: '',
      rolemi: '',
    }
  },
  created () {
    let a = sessionStorage.getItem('userInfo')
    a = JSON.parse(a)
    this.role = a.nickName
    this.rolemi = a.role
    if (this.rolemi == '教师') {
      if (sessionStorage.getItem('userClass')) {
        let aa = JSON.parse(sessionStorage.getItem('userClass'))
        this.Class = aa
      } else {
        this.getData()
      }
    }
  },
  methods: {
    logout () {
      fetch.get(allApi.logout, '', res => {
        window.location.href = res
      })
    },
    skip () {
      this.$router.push('/reminder')
    },
    getData () {
      fetch.get(allApi.getClassList, '', res => {
        if (res.code === 200) {
          this.Class = res.data[0].className
        } else if (res.code === 201) {
          this.$router.push('/501')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  height: 70px;
  background-image: linear-gradient(0deg, #4dd3ea 0%, #2bbee0 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
}
.left {
  width: 157px;
  height: 100%;
  float: left;
  padding-top: 10px;
  margin-left: 41px;
}
.center01 {
  float: right;
  width: 100px;
  height: 40px;
  background-color: #ffffff;
  box-shadow: 4px 4px 8px 0px rgba(50, 195, 226, 0.39);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  margin-top: 15px;
  user-select: none;
}
.center {
  float: right;
  margin-right: 50px;
  margin-top: 20px;
}
.center span {
  font-family: "SourceHanSansCN-Regular";
  font-size: 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
}
.center span::before {
  content: url(../assets/class_img/xx.png);
  margin-right: 4px;
}
.right {
  float: right;
  width: 100px;
  height: 40px;
  background-color: #ffffff;
  box-shadow: 4px 4px 8px 0px rgba(50, 195, 226, 0.39);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  margin-top: 15px;
  user-select: none;
}
.right span {
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
  color: #2fc0e1;
}
.right span::before {
  content: url(../assets/class_img/quit.png);
  margin-right: 4px;
  margin-top: 4px;
}
</style>