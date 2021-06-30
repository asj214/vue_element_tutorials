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
            <el-form-item label="페이지" required>
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
export default {
  data () {
    return {
      visible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      treeMenu: [
        {
          name: 'Admin',
          disabled: true,
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
        depth: 1,
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
      const requestUrl = 'http://127.0.0.1:8000/api/pages'
      const { status, data } = await this.axios.get(requestUrl)
      if (status === 200) {
        this.pages = data
      }
    },
    async getData () {
      const requestUrl = 'http://127.0.0.1:8000/api/menus'
      const { status, data } = await this.axios.get(requestUrl)
      if (status === 200) {
        this.menuList = data
        const nestedMenu = this.generateNested(data)
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
        depth: 1,
        is_published: false
      }
    },
    handleSetForm (data) {
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
      this.breadcrumbs = []
      this.generateBreadcrumb(data.parent_id)
    },
    handleAppendChild (data) {
      this.resetForm()
      this.menu.parent_id = data.id
    },
    generateBreadcrumb (parentId) {
      const menu = this.menuList.filter(item => item.id === parentId).pop()
      if (!menu) return
      this.breadcrumbs.push(menu.name)
      if (menu.parent) this.generateBreadcrumb(menu.parent)
    },
    generateNested (rows, depth = 0, parentId) {
      const ret = []
      let append = {}
      for (const i in rows) {
        if (rows[i].depth !== depth) continue
        if (parentId && rows[i].parent !== parentId) continue
        append = {
          id: rows[i].id,
          parent_id: rows[i].parent,
          name: rows[i].name,
          descr: rows[i].descr,
          depth: rows[i].depth,
          order: rows[i].order,
          page: rows[i].page,
          is_published: rows[i].is_published,
          children: this.generateNested(rows, rows[i].depth + 1, rows[i].id)
        }

        if (append.children.length === 0) delete append.children

        ret.push(append)
      }
      return ret
    }
  }
}
</script>
