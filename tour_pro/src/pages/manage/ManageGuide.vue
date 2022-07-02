<template>
<!-- 管理导游 -->
  <div id="manage-guide">
    <div class="tablename">导游信息</div>
    <el-table
      :data="tourArr"
      max-height="500"
      border
      style="width: 50%"
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="gNickname" label="导游名"> </el-table-column>
      <el-table-column prop="gEmail" label="电子邮箱"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="doDelete(scope.row.gId)" type="text" size="small"
            >删除</el-button
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
  name: "ManageGuide",
  components: {
    Pagination,
  },
  computed: {
    ...mapState(["tourArr"]),
  },
  methods: {
    ...mapMutations(["setTourArr"]),
    doDelete(gId) {
      if (confirm("确认删除")) {
        this.axios({
          method: "delete",
          url: "/guide/" + gId,
        }).then((resp) => {
          if (resp.data.code === 200000) {
            for (let i = 0; i < this.tourArr.length; i++) {
              if (this.tourArr[i].gId === gId) {
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
  },
  data() {
    return {
      totalNum: 0,
      url: "/guide",
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/guide",
      params: {
        pageNum: 1,
        pageSize: 20,
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