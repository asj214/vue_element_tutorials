<template>
  <el-menu :default-active="activeMenu" class="g-side" v-show="visible" router>
    <template v-for="(menu, key) in menus">
      <Tree :node="menu" :key="key"></Tree>
    </template>
  </el-menu>
</template>
<script>
import { generateNested } from '@/common/utils'
import Tree from '@/components/Tree'

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
  components: {
    Tree
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
