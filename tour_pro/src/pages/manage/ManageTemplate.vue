<template>
<!-- 管理模板 -->
  <div id="manage-template">
    <div class="tablename">服务模板信息</div>
    <el-table
      :data="tourArr"
      max-height="500"
      border
      style="width: 80%"
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="aName" label="景点"> </el-table-column>
      <el-table-column prop="gNickname" label="导游名"> </el-table-column>
      <el-table-column prop="temDuration" label="持续时间"> </el-table-column>
      <el-table-column prop="temMeetingpoint" label="集合点"> </el-table-column>
      <el-table-column prop="temDispoint" label="解散点"> </el-table-column>
      <el-table-column prop="temPrice" label="价格"> </el-table-column>
      <el-table-column prop="temMinNum" label="最少人数"> </el-table-column>
      <el-table-column prop="temMaxNum" label="人数上限"> </el-table-column>
      <el-table-column prop="temDescription" label="服务介绍" width="250">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="doDelete(scope.row.temId)"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="doCreate(scope.row.temId)"
            >创建服务</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination :totalNum="totalNum" :url="url"></pagination>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "ManageTemplate",
  components: {
    Pagination,
  },
  computed: {
    ...mapState(["tourArr", "user"]),
  },
  methods: {
    ...mapMutations(["setTourArr"]),
    doDelete(temId) {
      if (confirm("确认删除")) {
        this.axios({
          method: "delete",
          url: "/template/" + temId,
        }).then((resp) => {
          if (resp.data.code === 200000) {
            for (let i = 0; i < this.tourArr.length; i++) {
              if (this.tourArr[i].temId === temId) {
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
    doCreate(temId) {
      this.$router.push({
        name: "create-service",
        query: {
          temId,
        },
      });
    },
  },
  data() {
    return {
      totalNum: 0,
      url: "/template",
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/template",
      params: {
        pageNum: 1,
        pageSize: 20,
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