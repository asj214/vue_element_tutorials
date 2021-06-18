<template>
  <div>
    <el-container>
      <el-header>
        <el-row type="flex" class="g-head">
          <router-link :to="{ name: 'Dashboard' }" class="logo">admin</router-link>
          <div class="nav">
            <div class="usermenu">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  {{ currentUser.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Profile</el-dropdown-item>
                  <el-dropdown-item @click.native="logout">Logout</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="230px" class="hidden-sm-and-down">
          <Menu />
        </el-aside>
        <el-main>
          <div>
            <el-breadcrumb separator="/" class="bread" id="mybread">
              <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :to="item">
                {{ item.meta.name || item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-divider style="margin: 0 0 15px 0"></el-divider>
          <template>
            <router-view id="main"></router-view>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    Menu: () => import('./LeftMenu.vue')
  },
  computed: {
    ...mapGetters(['currentUser']),
    breadcrumbs: function () {
      const rows = (this.$route && this.$route.matched) || []
      return rows
    }
  },
  methods: {
    logout () {
      this.$store
        .dispatch('LOGOUT')
        .then(() => this.$router.push({ name: 'Login' }))
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
