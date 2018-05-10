<template>
    <div class="app-container">
        <el-table :data="routes.data" v-loading.body="listLoading" element-loading-text="Loading" border fit
                  highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="域名列表">
                <template slot-scope="scope">
                    <el-tag v-for="v in scope.row.hosts" type="success">{{v}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="路径列表" align="center" width="200">
                <template slot-scope="scope">
                    <el-tag v-for="v in scope.row.paths" type="success">{{v}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="方法列表" align="center" width="90">
                <template slot-scope="scope">
                    <el-tag v-for="v in scope.row.methods" type="success">{{v}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="协议列表" align="center" width="90">
                <template slot-scope="scope">
                    <el-tag v-for="v in scope.row.protocols" type="success">{{v}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" width="200" label="创建时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{scope.row.created_date}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="updated_at" width="200" label="更新时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{scope.row.updated_date}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='操作' width="300">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="editService(scope.row)">编辑</el-button>
                    <el-button type="success" size="mini" @click="toService(scope.row.service.id)">相关服务</el-button>
                    <el-button type="danger" size="mini" @click="deleteService(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="编辑服务" :visible.sync="dialogTableVisible">
            <el-form ref="form" :model="form" label-width="240px">
                <el-form-item label="ID">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="名字 name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="域名 host">
                    <el-input v-model="form.host"></el-input>
                </el-form-item>
                <el-form-item label="路径 path">
                    <el-input v-model="form.path"></el-input>
                </el-form-item>
                <el-form-item label="超时时间 connect_timeout">
                    <el-input v-model="form.connect_timeout"></el-input>
                </el-form-item>
                <el-form-item label="端口 port">
                    <el-input v-model="form.port"></el-input>
                </el-form-item>
                <el-form-item label="协议 protocol">
                    <el-input v-model="form.protocol"></el-input>
                </el-form-item>
                <el-form-item label="读超时时间 read_timeout">
                    <el-input v-model="form.read_timeout"></el-input>
                </el-form-item>
                <el-form-item label="写超时时间 write_timeout">
                    <el-input v-model="form.write_timeout"></el-input>
                </el-form-item>
                <el-form-item label="尝试次数 retries">
                    <el-input v-model="form.retries"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">更新</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
  import { KongWebSocket } from '@/utils/ws'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        listLoading: false,
        offset: null,
        size: 10,
        dialogTableVisible: false,
        form: {}
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      ...mapGetters(['routes'])
    },
    methods: {
      fetchData() {
        var kong = KongWebSocket.getInstance()
        kong.routes(this.size, this.offset)
      },
      editService(data) {
        console.log(data)
        this.form = data
        this.dialogTableVisible = true
      },
      deleteService(id) {
        var kong = KongWebSocket.getInstance()
        kong.deleteService(id)
      },
      onCancel() {
        this.dialogTableVisible = false
      },
      onSubmit() {
        console.log(this.form)
        var kong = KongWebSocket.getInstance()
        kong.upsertService(this.form)
        this.dialogTableVisible = false
      },
      toService(id) {
        console.log(id)
      }
    }
  }
</script>
