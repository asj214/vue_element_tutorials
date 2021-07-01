<template>
  <div>
    <el-menu-item :index="node.page.path" v-if="!node.children">{{ node.name }}</el-menu-item>
    <el-submenu v-if="node.children" :index="node.page.path">
      <template slot="title">{{ node.name }}</template>
      <template v-for="(child, key) in node.children">
        <node :node="child" :key="key"></node>
      </template>
    </el-submenu>
  </div>
</template>
<script>
export default {
  name: 'node',
  props: {
    node: Object
  }
}
</script>
