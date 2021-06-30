<template>
  <el-menu :default-active="activeMenu" class="g-side" v-show="visible" router>
    <template v-for="(menu, key) in menus">
      <el-menu-item :key="key" :index="menu.page.path" v-if="!menu.children">{{ menu.name }}</el-menu-item>
      <el-submenu :key="key" v-if="menu.children" :index="menu.page.path">
        <template slot="title">{{ menu.name }}</template>
        <template v-for="child in menu.children">
          <el-menu-item :index="child.page.path" :key="child.id">{{ child.name }}</el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      menus: []
    }
  },
  computed: {
    activeMenu: function () {
      const path = this.$route.path.split('/').filter(function (el) { return el })
      const reg = /[1-9]/
      if (reg.exec(path[path.length - 1])) {
        path.pop()
      }
      return '/' + path.join('/')
    }
  },
  created () {
    this.getMenuData()
  },
  methods: {
    async getMenuData () {
      const requestUrl = 'http://127.0.0.1:8000/api/menus/tree'
      const { status, data } = await this.axios.get(requestUrl)
      if (status === 200) {
        this.visible = true
        this.menus = data
      }
    }
  }
}
</script>
