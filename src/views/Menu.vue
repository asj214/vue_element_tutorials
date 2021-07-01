<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="6" :lg="5" :xl="4">
        <el-tree
            node-key="id"
            v-show="visible"
            :data="treeMenu"
            :props="defaultProps"
            :highlight-current="true"
            :default-expand-all="true"
            :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span @click="handleSetForm(data)">{{ node.label }}</span>
            <span>
              <el-button type="text" style="color: #909399" @click="handleAppendChild(data)">+</el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="20">
        <div>
          <el-form ref="form" label-width="140px" size="mini">
            <el-form-item label="메뉴 경로" required>
              <el-breadcrumb separator=">" style="margin-top: 6px">
                <el-breadcrumb-item>Admin</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(breadcrumb, key) in breadcrumbs" :key="key">{{ breadcrumb }}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-form-item>
            <el-form-item label="메뉴명" required>
              <el-input v-model="menu.name"></el-input>
            </el-form-item>
            <el-form-item label="메뉴 설명" required>
              <el-input v-model="menu.descr"></el-input>
            </el-form-item>
            <el-form-item label="순서" required>
              <el-input-number v-model="menu.order" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="페이지">
              <el-select v-model="menu.page_id" filterable placeholder="페이지 선택">
                  <el-option
                    v-for="page in pages"
                    :key="page.id"
                    :label="page.name"
                    :value="page.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="공개 설정">
              <el-switch v-model="menu.is_published"></el-switch>
            </el-form-item>
          </el-form>
          <el-form label-width="140px" size="mini">
            <el-form-item>
              <div class="float-left" style="margin-right: 5px;">
                <el-button type="primary" @click.prevent="onSubmit" :loading="isLoading" v-if="!isModify">저장</el-button>
                <el-button type="primary" @click="onModify" :loading="isLoading" v-else>수정</el-button>
                <el-button type="danger" @click="onDelete" v-if="isModify">삭제</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
<script>
import { generateNested } from '@/common/utils'

export default {
  data () {
    return {
      visible: false,
      isModify: false,
      isLoading: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeMenu: [
        {
          name: 'Admin',
          disabled: true,
          depth: -1,
          children: []
        }
      ],
      menus: [],
      id: null,
      menu: {
        parent_id: null,
        page_id: null,
        descr: '',
        name: '',
        order: 0,
        depth: 0,
        is_published: false
      },
      pages: [],
      menuList: [],
      breadcrumbs: []
    }
  },
  created () {
    this.getData()
    this.getPages()
  },
  methods: {
    async getPages () {
      const { status, data } = await this.axios.get('pages')
      if (status === 200) {
        this.pages = data
      }
    },
    async getData () {
      const { status, data } = await this.axios.get('menus')
      if (status === 200) {
        this.menuList = data
        const nestedMenu = generateNested(data)
        this.treeMenu[0].children = nestedMenu
        this.menus = nestedMenu
        this.visible = true
      }
    },
    resetForm () {
      this.id = null
      this.menu = {
        parent_id: null,
        page_id: null,
        name: '',
        descr: '',
        order: 0,
        depth: 0,
        is_published: false
      }
      this.isModify = false
    },
    handleSetForm (data) {
      if (data.depth === -1) return
      this.resetForm()

      let pageId = null
      if (data.page) pageId = data.page.id

      this.id = data.id
      this.menu = {
        parent_id: data.parent_id,
        page_id: pageId,
        name: data.name,
        descr: data.descr,
        order: data.order,
        depth: data.depth,
        is_published: data.is_published
      }
      this.setBreadcrumb(data.parent_id)
      this.isModify = true
    },
    handleAppendChild (data) {
      this.resetForm()
      this.menu.parent_id = data.id
      this.menu.depth = data.depth + 1
      this.setBreadcrumb(data.id)
    },
    setBreadcrumb (parentId) {
      this.breadcrumbs = []
      this.generateBreadcrumb(parentId)
      this.breadcrumbs.reverse()
    },
    generateBreadcrumb (parentId) {
      const menu = this.menuList.filter(item => item.id === parentId).pop()
      if (!menu) return
      this.breadcrumbs.push(menu.name)
      if (menu.parent) this.generateBreadcrumb(menu.parent)
    },
    async onSubmit () {
      const { status } = await this.axios.post('menus', { ...this.menu })
      if (status === 201) {
        this.$message('성공적으로 등록되었습니다.')
        location.reload()
      }
    },
    async onModify () {
      this.isLoading = true
      const { status } = await this.axios.put(`menus/${this.id}`, { ...this.menu })
      if (status === 200) {
        this.isLoading = false
        this.$message('수정 완료')
        location.reload()
      }
    },
    async onDelete () {
      const { status } = await this.axios.delete(`menus/${this.id}`)
      if (status === 204) {
        this.$message('삭제 완료')
        location.reload()
      }
    }
  }
}
</script>
