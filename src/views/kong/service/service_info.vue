<template>
    <div class="mixin-components-container">
        <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>服务信息</span>
                    </div>
                    <div>
                        <el-form :model="serviceInfo.service">
                            <el-form-item prop="id">ID: {{serviceInfo.service.id}}</el-form-item>
                            <el-form-item prop="host">host: {{serviceInfo.service.host}}</el-form-item>
                            <el-form-item prop="name">name: {{serviceInfo.service.name}}</el-form-item>
                            <el-form-item prop="path">path: {{serviceInfo.service.path}}</el-form-item>
                            <el-form-item prop="port">port: {{serviceInfo.service.port}}</el-form-item>
                            <el-form-item prop="protocol">protocol: {{serviceInfo.service.protocol}}</el-form-item>
                            <el-form-item prop="retries">retries: {{serviceInfo.service.retries}}</el-form-item>
                            <el-form-item prop="write_timeout">write_timeout: {{serviceInfo.service.write_timeout}}</el-form-item>
                            <el-form-item prop="read_timeout">read_timeout: {{serviceInfo.service.read_timeout}}</el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>图片hover效果</span>
                    </div>
                    <div class="component-item">
                        <pan-thumb width="100px" height="100px"
                                   image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191">
                            vue-element-admin
                        </pan-thumb>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="6">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Share</span>
                    </div>
                    <div class="component-item" style="height:420px;">
                        <dropdown-menu style="margin:0 auto;" title='系列文章' :items='articleList'></dropdown-menu>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
  import { KongWebSocket } from '@/utils/ws'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        id: null,
        listLoading: false,
        next: null,
        size: 10,
        dialogTableVisible: false,
      }
    },
    created() {
      var id = this.$route.params.id
      if (id !== undefined && id !== null) {
        this.id = id
        var kong = KongWebSocket.getInstance()
        kong.serviceInfo(id)
      } else {
        this.$route.push({ name: '404' })
      }
    },
    computed: {
      ...mapGetters(['serviceInfo'])
    },
    methods: {
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
      }
    }
  }
</script>
