<template>
    <div class="app-container">
        <el-table :data="list" element-loading-text="Loading" border fit
                  highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.node.id}}
                </template>
            </el-table-column>
            <el-table-column label="节点名" width="110" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.node.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="节点地址" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.node.url}}</span>
                </template>
            </el-table-column>
            <el-table-column label="总链接数" width="110" align="center">
                <template slot-scope="scope">
                    {{scope.row.server.total_requests}}
                </template>
            </el-table-column>
            <el-table-column label="接受的链接数" width="110" align="center">
                <template slot-scope="scope">
                    {{scope.row.server.connections_accepted}}
                </template>
            </el-table-column>
            <el-table-column label="处理的链接数" width="110" align="center">
                <template slot-scope="scope">
                    {{scope.row.server.connections_handled}}
                </template>
            </el-table-column>
            <el-table-column label="活跃的链接数" width="110" align="center">
                <template slot-scope="scope">
                    {{scope.row.server.connections_active}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  import { KongWebSocket } from '@/utils/ws'

  export default {
    name: 'dashboard',
    data() {
      return {
        list: []
      }
    },
    created() {
      var kong = KongWebSocket.getInstance()
      this.list = kong.nodes
      console.log(this.list)
      this.fetchData()
    },
    methods: {
      fetchData() {
        var kong = KongWebSocket.getInstance()
        console.log(kong.nodes)
        kong.status()
      }
    },
    watch: {
      list(old, newValue) {
        console.log(old)
        console.log(newValue)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }
        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>
