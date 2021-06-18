<template>
  <el-row>
    <el-col :span="10" style="min-width: 740px">
      <el-form ref="form" label-width="120px" size="mini">
        <el-form-item label="이메일" required>
          <el-input v-model="user.email" v-bind:readonly="isReadOnly"></el-input>
        </el-form-item>
        <el-form-item label="이름" required>
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="사용자 이름" required>
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="전화번호" required>
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="웹사이트" required>
          <el-input v-model="user.website"></el-input>
        </el-form-item>
        <el-form-item label="우편번호">
          <el-input v-model="user.address.zipcode"></el-input>
        </el-form-item>
        <el-form-item label="시티">
          <el-input v-model="user.address.city"></el-input>
        </el-form-item>
        <el-form-item label="스트릿">
          <el-input v-model="user.address.street"></el-input>
        </el-form-item>
        <el-form-item label="상세주소">
          <el-input v-model="user.address.suite"></el-input>
        </el-form-item>
        <el-form-item label="위도">
          <el-input v-model="user.address.geo.lat"></el-input>
        </el-form-item>
        <el-form-item label="경도">
          <el-input v-model="user.address.geo.lng"></el-input>
        </el-form-item>
        <el-form-item label="회사명">
          <el-input v-model="user.company.name"></el-input>
        </el-form-item>
        <el-form-item label="bs">
          <el-input v-model="user.company.bs"></el-input>
        </el-form-item>
        <el-form-item label="catchPhrase">
          <el-input v-model="user.company.catchPhrase"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">저장</el-button>
          <el-button @click="$router.go(-1)">목록</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      isReadOnly: false,
      id: this.$route.params.id || null,
      user: {
        email: '',
        name: '',
        username: '',
        phone: '',
        website: '',
        company: {
          bs: '',
          name: '',
          catchPhrase: ''
        },
        address: {
          zipcode: '',
          city: '',
          street: '',
          suite: '',
          geo: {
            lat: '',
            lng: ''
          }
        }
      }
    }
  },
  created () {
    if (this.id) {
      this.getData()
    }
  },
  methods: {
    async getData () {
      const { status, data } = await this.axios.get(`users/${this.id}`)
      if (status === 200) {
        this.user = data
        this.isReadOnly = true
      }
    },
    onSubmit () {
      this.$message({ message: '저장 완료' })
      this.$router.push({ name: 'UserList' })
    }
  }
}
</script>
