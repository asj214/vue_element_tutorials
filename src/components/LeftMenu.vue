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
import { generateNested } from '@/common/utils'

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
      const { status, data } = await this.axios.get('menus')
      if (status === 200) {
        this.menus = generateNested(data)
        this.visible = true
      }
    }
  }
}
</script>
