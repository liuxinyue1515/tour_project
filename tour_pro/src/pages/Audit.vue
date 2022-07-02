<template>
  <div id="audit">
    <div class="tablename">导游服务信息</div>
    <el-table
      :data="tourArr"
      max-height="500"
      border
      style="width: 85%"
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="aName" label="景点"> </el-table-column>
      <el-table-column prop="gNickname" label="导游名"> </el-table-column>
      <el-table-column prop="temDuration" label="持续时间(单位: 分钟)">
      </el-table-column>
      <el-table-column prop="temMeetingpoint" label="集合点"> </el-table-column>
      <el-table-column prop="temDispoint" label="解散点"> </el-table-column>
      <el-table-column prop="temPrice" label="价格(RMB)"> </el-table-column>
      <el-table-column prop="temMinNum" label="最少人数"> </el-table-column>
      <el-table-column prop="temMaxNum" label="人数上限"> </el-table-column>
      <el-table-column prop="pStartTime" label="开始时间"> </el-table-column>
      <el-table-column label="状态" width="80">
        <template>
          <el-tag type="success" size="small">已通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="doFail(scope.row)"
            v-if="user.fromAdmin"
            >撤回</el-button
          >
          <el-button type="text" size="small" @click="doDelete(scope.row.pId)"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="doCheck(scope.row.pId)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination :totalNum="totalNum" :url="url" :aState="aState"></Pagination>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Audit",
  components: {
    Pagination,
  },
  computed: {
    ...mapState(["tourArr", "user"]),
  },
  methods: {
    ...mapMutations(["setTourArr"]),
    doDelete(pId) {
      if (confirm("确认删除")) {
        this.axios({
          method: "delete",
          url: "/project/" + pId,
        }).then((resp) => {
          if (resp.data.code === 200000) {
            for (let i = 0; i < this.tourArr.length; i++) {
              if (this.tourArr[i].pId === pId) {
                this.tourArr.splice(i, 1);
                break;
              }
            }
            this.totalNum--;
            this.$notify({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$notify({
              message: "删除失败",
              type: "error",
            });
          }
        });
      }
    },
    doFail(row) {
      this.axios({
        method: "post",
        url: "/project/state",
        params: {
          pId: row.pId,
          pState: "0",
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        if (resp.data.code === 200000) {
          for (let i = 0; i < this.tourArr.length; i++) {
            if (this.tourArr[i].pId === row.pId) {
              this.tourArr.splice(i, 1);
              break;
            }
          }
          this.totalNum--;
          this.$notify({
            message: "撤回成功",
            type: "success",
          });
        } else {
          this.$notify({
            message: "通过失败",
            type: "error",
          });
        }
      });
    },
    doCheck(pId) {
      this.$router.push({
        name: "service",
        query: {
          pId,
        },
      });
    },
  },
  data() {
    return {
      totalNum: 0,
      url: "/project",
      aState: 1,
    };
  },
  mounted() {
    if (this.user.fromAdmin) {
      this.axios({
        method: "get",
        url: "/project",
        params: {
          pageNum: 1,
          pageSize: 20,
          state: 1,
        },
      }).then((resp) => {
        if (resp.data.code === 200000) {
          this.setTourArr(resp.data.data.rows);
          this.totalNum = parseInt(resp.data.data.totalNum);
        } else {
          this.setTourArr([]);
        }
      });
    } else {
      this.axios({
        method: "get",
        url: "/project",
        params: {
          pageNum: 1,
          pageSize: 20,
          state: 1,
          gId: this.user.uid,
        },
      }).then((resp) => {
        if (resp.data.code === 200000) {
          this.setTourArr(resp.data.data.rows);
          this.totalNum = parseInt(resp.data.data.totalNum);
        } else {
          this.setTourArr([]);
        }
      });
    }
  },
};
</script>

<style scoped>
.tablename {
  font-size: 2em;
  font-weight: bold;
}
.el-table /deep/ {
  margin: 10px auto;
}
</style>