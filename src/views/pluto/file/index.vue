<template>
  <div class="pluto-file">
    <h2 class="sharp-header">文件管理</h2>
    <el-tabs v-model="activeSection" @tab-click="changeSection">
      <el-tab-pane label="本地文件" name="local"></el-tab-pane>
      <el-tab-pane label="腾讯云" name="tencent"></el-tab-pane>
    </el-tabs>

    <query-group>
      <el-form-item size="small">
        <el-input style="width: 260px" placeholder="输入文件名搜索"></el-input>
      </el-form-item>
    </query-group>

    <section class="file-table">
      <el-table
        ref="multipleTable"
        :data="fileList"
        @row-contextmenu="openMenu"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="45">
        </el-table-column>
        <el-table-column
          label="缩略图"
          width="90">
          <template slot-scope="scope">
            <img :src="scope.row.virtualPath" alt=""
                 preview="0"
                 style="height: 80px;width:80px;object-fit: scale-down">
          </template>
        </el-table-column>
        <el-table-column
          prop="filename"
          min-width="200px"
          label="文件名">
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
          width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="deleteFile(scope.row)">
              移除
            </el-button>
            <el-button
              type="text"
              size="small">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <context-menu ref="menu">
      <div>dasds</div>
    </context-menu>

  </div>
</template>

<script>
import QueryGroup from "@/components/form/QueryGroup";
import ContextMenu from "@/components/menu/ContextMenu";
import {deleteFile, queryBy} from "@/api/file";
import {convertFileSize} from "@/utils/convert";
import {deleteFriend} from "@/api/friend";

export default {
  name: "PlutoFile",
  components: {
    ContextMenu,
    QueryGroup
  },
  data(){
    return {
      openContextMenu: false,
      popperOptions: {
        modifiers: [
          {
            name: 'popperOffsets',
            options: {
              offset: [100, 200],
            },
          }
        ]
      },
      activeSection: this.$route.query.section || 'local',
      selectedFiles: [],
      fileList: [],
      query: {
        filename: '',
        type: '',
      }
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
        this.$nextTick(() => {
          document.querySelectorAll('img[preview]').forEach(e => {
            e.onerror = () => {
              e.removeAttribute('preview');
            }
          });
          this.$previewRefresh();
        })
      }).catch(() => {});
    },
    deleteFile(file){
      this.$confirm(`确定删除${file.filename}吗`,'提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return deleteFile(file.filePath);
      }).then(() => {
        this.$message.success('删除文件成功');
      }).catch(() => {})
    },
    convertFileSize(size){
      return convertFileSize(size);
    },
    openMenu(col,d,event){
      this.$refs.menu.open(event);
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

}
</style>
