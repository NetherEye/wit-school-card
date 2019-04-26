<template>
  <div id="nav">
    <ul>
      <li :class="isActive(item)" v-for="(item, index) in navList" v-if="item.meta.indexOf(userType) != -1" :key="index">
        <span @click="go(item.path, item)">{{item.title}}</span>
        <div class="lis" v-if="item.list" v-show="item.listShow">
          <a v-for="items in item.list" v-show="item" :class="activeNav === items.path ? 'active' : ''" :key="item.path" @click="go(items.path)">{{items.title}}</a>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data () {
    return {
      activeNav: '/',
      userType: '',
      navList: [
        {
          path: '/',
          title: '首页',
          meta: ['学校', '班级']
        },
        {
          title: '设备管理',
          meta: ['学校'],
          listShow: false,
          list: [
            {
              path: '/equipment',
              title: '设备管理'
            }
          ]
        },
        {
          title: '教学管理',
          meta: ['学校'],
          listShow: false,
          list: [
            // {
            // 	path: '/grade',
            // 	title: '年级管理'
            // },
            // {
            // 	path: '/subject',
            // 	title: '学科管理'
            // },
            // {
            // 	path: '/class',
            // 	title: '班级管理'
            // },
            // {
            // 	path: '/teacher',
            // 	title: '教师管理'
            // },
            // {
            // 	path: '/student',
            // 	title: '学生管理'
            // },
            {
              path: '/exam',
              title: '考试设置'
            },
            {
              path: '/exam-room',
              title: '考场设置'
            },
          ]
        },
        {
          title: '校级建设',
          meta: ['学校'],
          listShow: false,
          list: [
            {
              path: '/school-introduce',
              title: '学校介绍'
            },
            {
              path: '/school-news',
              title: '学校新闻'
            },
            {
              path: '/school-inform',
              title: '学校通知'
            },
          ]
        },
        {
          title: '考勤管理',
          meta: ['学校'],
          listShow: false,
          list: [
            {
              path: '/attendance-set',
              title: '考勤设置'
            },
            {
              path: '/attendance-detail',
              title: '考勤详情'
            }
          ]
        },
        {
          title: '班级建设',
          meta: ['班级'],
          listShow: false,
          list: [
            {
              path: '/class-info',
              title: '班级信息'
            },
            {
              path: '/class-mien',
              title: '班级风采'
            },
            {
              path: '/class-honor',
              title: '班级荣誉'
            },
            {
              path: '/class-timetable',
              title: '班级课表'
            },
            {
              path: '/class-duty',
              title: '班级值日'
            },
            {
              path: '/class-inform',
              title: '班级通知'
            },
            {
              path: '/class-praise',
              title: '表扬榜'
            },
          ]
        },
        {
          title: '考勤管理',
          meta: ['班级'],
          listShow: false,
          list: [
            {
              path: '/attendance-detail',
              title: '考勤详情'
            }
          ]
        },
      ]
    }
  },
  created () {
    if (sessionStorage.getItem('activeNav')) {
      this.activeNav = sessionStorage.getItem('activeNav')
      this.navList.forEach(a => {
        if (a.path === undefined) {
          a.list.forEach(b => {
            if (b.path === this.activeNav) {
              a.listShow = true
            }
          })
        }
      })
    }
  },
  mounted () {
    let a = sessionStorage.getItem('userInfo')
    a = JSON.parse(a)
    if (a.role == '教师') {
      this.userType = '班级'
    } else {
      this.userType = '学校'
    }
  },
  methods: {
    go (path, item) {
      if (path === this.$route.path) {
        return
      }
      if (path === undefined) {
        item.listShow = !item.listShow
        return
      }
      this.activeNav = path
      sessionStorage.setItem('activeNav', path)


      this.$router.push({
        path: path
      })
    },
    isActive (item) {
      if (item.list) {
        let _class = ''
        item.list.forEach(a => {
          if (a.path === this.activeNav) {
            _class = 'active'
          }
        })
        return _class
      } else {
        return this.activeNav === item.path ? 'active' : ''
      }


    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#nav {
  width: 165px;
  min-width: 165px;
  height: 100%;
  background-color: #ffffff;
  overflow: auto;
}

ul {
  padding-top: 40px;
  padding-left: 40px;
  position: relative;
  z-index: 999;
}

li span {
  font-size: 16px;
  letter-spacing: 0px;
  color: #485a5d;
  cursor: pointer;
}

ul li {
  margin-bottom: 40px;
  user-select: none;
}

.lis {
  margin-top: 19px;
}

.lis a {
  display: inline-block;
  padding-left: 16px;
  font-size: 16px;
  color: #919d9f;
  text-decoration: none;
  height: 17px;
  line-height: 17px;
  margin-bottom: 26px;
  cursor: pointer;
}
.lis a:last-child {
  margin-bottom: 0;
}

.active {
  color: #31c1e2 !important;
}

.active span {
  color: #31c1e2;
  position: relative;
}
.active span::before {
  content: "";
  display: inline-block;
  position: absolute;
  top: 2px;
  left: -14px;
  width: 7px;
  height: 17px;
  background-color: #31c1e2;
}
</style>