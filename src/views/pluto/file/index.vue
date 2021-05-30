<template>
  <div class="pluto-file">
    <h2 class="sharp-header">文件管理</h2>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane label="本地文件" name="local"></el-tab-pane>
<!--      <el-tab-pane label="腾讯云" name="tencent"></el-tab-pane>-->
    </el-tabs>

    <query-group @search="refresh">
      <el-form-item size="small">
        <el-input
          v-model="query.filename"
          style="width: 240px"
          placeholder="输入文件名搜索"></el-input>
      </el-form-item>
      <el-form-item size="small">
        <el-select
          style="width: 140px"
          v-model="query.type"
          filterable
          clearable
          placeholder="文件类型">
          <el-option
            v-for="type in fileType"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
    </query-group>

    <crud-operation
      crud="cd"
      create-text="上传"
      @create="dialogVisible = true"
      @delete="deleteFile(selectedFiles)"
      @refresh="refresh"
      :delete-disabled="selectedFiles.length===0"></crud-operation>

    <section class="file-table">
      <el-table
        ref="multipleTable"
        :data="fileList"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="45">
        </el-table-column>
        <el-table-column
          label="预览图"
          width="90">
          <template slot-scope="{row}">
            <img :src="row.virtualPath" alt=""
                 v-photoswipe:group1
                 v-if="isImage(row.filename)"
                 style="height: 80px;width:80px;object-fit: scale-down">
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="filename"
          min-width="200px"
          label="文件名">
          <template slot-scope="{row}">
            <div class="filename-cell">
              <span
                class="file-icon"
                :class="getClassWithColor(row.filename)"></span>
              <a :href="row.virtualPath" target="_blank"><span>{{row.filename}}</span></a>
              <span class="fa fa-file-o copy-icon" @click="handleCopy(row)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="大小"
          width="100">
          <template slot-scope="scope">
            {{convertFileSize(scope.row.size)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          width="50">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="deleteFile([scope.row])">
              移除
            </el-button>
<!--            <el-button-->
<!--              type="text"-->
<!--              size="small">-->
<!--              详情-->
<!--            </el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </section>

    <el-pagination
      style="display: flex;justify-content: center"
      :hide-on-single-page="false"
      @current-change="handleCurrentChange"
      :pager-count="5"
      :page-size="query.size"
      :current-page="query.page+1"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>

    <el-dialog
      title="上传文件"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      :close-on-click-modal="true"
      :lock-scroll="false"
      max-width="100%">

      <el-upload
        class="dialog-upload"
        drag
        action="#"
        :before-upload="uploadFile"
        :file-list="uploadFileList"
        with-credentials
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import QueryGroup from "@/components/form/QueryGroup";
import {deleteFile, queryBy, uploadFile} from "@/api/file";
import {convertFileSize} from "@/utils/convert";
import CrudOperation from "@/components/form/CrudOperation";
import query from "@/mixins/query";
import NeplogConfig from "@/config/neplog";
import {getClassWithColor} from 'file-icons-js';
import 'file-icons-js/css/style.css';

export default {
  name: "PlutoFile",
  components: {
    CrudOperation,
    QueryGroup
  },
  mixins: [query],
  data(){
    return {
      dialogVisible: false,
      activeSection: this.$route.query.section || 'local',
      selectedFiles: [],
      fileList: [],
      uploadFileList:[],
      query: {
        filename: '',
        type: '',
        size: 15,
        page: 0
      },
      total: 0,
      fileType:[
        {label: '头像', value:'avatar'},
        {label: '封面', value:'cover'},
        {label: '图片', value:'image'},
        {label: '文件', value: 'file'},
      ],
      imageExtension: [
        'jpg','jpeg','jpe','jif','jfif','jfi',
        'png',
        'gif',
        'webp',
        'bmp',
        'tiff','tif',
        'psd',
        'svg',
        'ico',]
    }
  },
  mounted() {
    this.refresh();
  },
  methods: {
    changeSection(tab) {
      this.activeSection = tab.name
    },
    refresh(){
      queryBy(this.query, this.activeSection).then(data => {
        this.fileList = data.content;
        this.total = data.total;
        this.$nextTick(() => {
          document.querySelectorAll('img[preview]').forEach(e => {
            e.onerror = () => {
              e.removeAttribute('preview');
            }
          });
        })
      }).catch(() => {});
    },
    deleteFile(file){
      let tips = file.slice(0,3).map(f => f.filename).join(', ');
      let ids = file.map(f => f.id);
      if(file.length > 3){
        tips += `等共${file.length}个文件`
      }
      this.$confirm(`确定删除${tips}吗`,'提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteFile(ids);
      }).then(() => {
        this.$message.success('删除文件成功');
        this.refresh()
      }).catch(() => {})
    },
    convertFileSize(size){
      return convertFileSize(size);
    },
    handleSelectionChange(val){
      this.selectedFiles = val;
    },
    uploadFile(file){
      if(file.size > NeplogConfig.maxFileSize){
        this.$message.error(`文件大小不能超过${NeplogConfig.maxFileSize/1024/1024}MB`);
        return false;
      }
      uploadFile(file, file.filename).then(() => {
        this.$message.success('上传文件成功')
      }).catch(() => {});
      return false;
    },
    isImage(filename){
      let i =filename.lastIndexOf('.');
      if(i < 0){
        return false;
      }
      let extension = filename.substr(i+1).toLowerCase();
      return this.imageExtension.indexOf(extension) >= 0;
    },
    getClassWithColor(filename){
      return getClassWithColor(filename);
    },
    handleCopy(file){
      this.$copyText(location.origin + file.virtualPath).then(() => {
        this.$message.success("文件路径已复制到剪切板")
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.pluto-file{
  .file-table{
    ::v-deep{
      .el-button{
        padding: 0;
        font-size: 14px;
      }
    }
  }
  .file-icon{
    margin-right: 4px;
  }
  .copy-icon{
    display: none;
    margin-left: 12px;
    cursor: pointer;
    color: var(--vscode-keyword);
  }
  .filename-cell:hover{
    .copy-icon{
      display: inline-block;
    }
  }
}

.dialog-upload{
  width:100%;
  ::v-deep {
    .el-upload{
      width: 100%;
    }
    .el-upload-dragger{
      width: 100%;
    }
  }
}
</style>
