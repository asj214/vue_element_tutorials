<template>
  <el-menu :default-active="activeMenu" class="g-side" router>
    <el-menu-item index="/users">직원 관리</el-menu-item>
    <!-- <el-submenu index="99">
      <template slot="title">사이트 관리</template>
      <el-menu-item index="/countries">국가 관리</el-menu-item>
    </el-submenu> -->
  </el-menu>
</template>
<script>
export default {
  data: () => ({
  }),
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
  methods: {
  }
}
</script>
