<template>
  <el-table
    border
    size="mini"
    :data="lists"
  >
    <el-table-column prop="id" label="id" width="50"></el-table-column>
    <el-table-column prop="email" label="email">
      <template slot-scope="scope">
        <el-button type="text" @click.prevent="handleDetail(scope.row)">{{ scope.row.email }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="name"></el-table-column>
    <el-table-column prop="username" label="username"></el-table-column>
    <el-table-column prop="phone" label="phone"></el-table-column>
    <el-table-column prop="company.name" label="company"></el-table-column>
    <el-table-column prop="website" label="website"></el-table-column>
  </el-table>
</template>
<script>
export default {
  data () {
    return {
      lists: []
    }
  },
  created () {
    this.getLists()
  },
  methods: {
    async getLists () {
      const { status, data } = await this.axios.get('users')
      if (status === 200) {
        this.lists = data
      }
    },
    handleDetail (row) {
      this.$router.push({ name: 'UserDetail', params: { id: row.id } })
    }
  }
}
</script>
