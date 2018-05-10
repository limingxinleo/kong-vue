<template>
    <div class="app-container">
        <el-table :data="services.data" v-loading.body="listLoading" element-loading-text="Loading" border fit
                  highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="名称" width="110" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="域名" align="center">
                <template slot-scope="scope">
                    {{scope.row.host}}
                </template>
            </el-table-column>
            <el-table-column label="路径" align="center">
                <template slot-scope="scope">
                    {{scope.row.path}}
                </template>
            </el-table-column>
            <el-table-column label="尝试次数" width="110" align="center">
                <template slot-scope="scope">
                    {{scope.row.retries}}
                </template>
            </el-table-column>
            <el-table-column label="端口" width="60" align="center">
                <template slot-scope="scope">
                    {{scope.row.port}}
                </template>
            </el-table-column>
            <el-table-column label="协议" width="60" align="center">
                <template slot-scope="scope">
                    {{scope.row.protocol}}
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
            <el-table-column align="center" label='操作' width="160">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="editService(scope.row)">编辑</el-button>
                    <el-button type="success" size="mini" @click="serviceInfo(scope.row.id)">详情</el-button>
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
        next: null,
        size: 10,
        dialogTableVisible: false,
        form: {}
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      ...mapGetters(['services'])
    },
    methods: {
      fetchData() {
        var kong = KongWebSocket.getInstance()
        kong.services(this.size, this.next)
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
      serviceInfo(id) {
        this.$router.push({ name: 'kong.service.info', params: { id: id } })

      },
      onCancel() {
        this.dialogTableVisible = false
      },
      onSubmit() {
        console.log(this.form)
        var kong = KongWebSocket.getInstance()
        kong.upsertService(this.form)
        this.dialogTableVisible = false
      }
    }
  }
</script>
