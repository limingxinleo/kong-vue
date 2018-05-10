<template>
    <div class="app-container">
        <el-form ref="route_add" :model="form" label-width="120px">
            <el-form-item label="名字 name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="URL">
                <el-input v-model="form.url"></el-input>
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
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { KongWebSocket } from '@/utils/ws'

  export default {
    data() {
      return {
        form: {}
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form)
        var kong = KongWebSocket.getInstance()
        kong.upsertService(this.form)
        this.$message('新建服务成功')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
    .line {
        text-align: center;
    }
</style>

