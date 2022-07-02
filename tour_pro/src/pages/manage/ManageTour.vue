<template>
<!-- 管理景点 -->
  <div id="manage-tour">
    <div class="tablename">景点信息</div>
    <el-table
      :data="tourArr"
      max-height="500"
      border
      style="width: 70%"
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="aName" label="景点名称" width="100">
      </el-table-column>
      <el-table-column label="景区图片">
        <template slot-scope="scope">
          <img :src="scope.row.aPicUrl" alt="图片" class="pic" />
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag type="success" size="small" v-if="parseInt(scope.row.aState)"
            >已通过</el-tag
          >
          <el-tag type="danger" size="small" v-else>待审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="doPass(scope.row)"
            type="text"
            size="small"
            v-if="!parseInt(scope.row.aState)"
            >通过</el-button
          >
          <el-button @click="doFail(scope.row)" type="text" size="small" v-else
            >撤回</el-button
          >
          <el-button type="text" size="small" @click="doDelete(scope.row.aId)"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="doCheck(scope.row.aId)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination :totalNum="totalNum" :url="url"></Pagination>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "ManageTour",
  components: {
    Pagination,
  },
  computed: {
    ...mapState(["tourArr"]),
  },
  methods: {
    ...mapMutations(["setTourArr"]),
    doDelete(aId) {
      if (confirm("确认删除")) {
        this.axios({
          method: "delete",
          url: "/attraction/" + aId,
        }).then((resp) => {
          if (resp.data.code === 200000) {
            for (let i = 0; i < this.tourArr.length; i++) {
              if (this.tourArr[i].aId === aId) {
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
    doPass(row) {
      this.axios({
        method: "post",
        url: "/attraction/state",
        params: {
          aId: row.aId,
          aState: "1",
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        if (resp.data.code === 200000) {
          row.aState = 1;
          this.$notify({
            message: "通过成功",
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
    doFail(row) {
      this.axios({
        method: "post",
        url: "/attraction/state",
        params: {
          aId: row.aId,
          aState: "0",
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        if (resp.data.code === 200000) {
          row.aState = 0;
          this.$notify({
            message: "撤回成功",
            type: "success",
          });
        } else {
          this.$notify({
            message: "撤回失败",
            type: "error",
          });
        }
      });
    },
    doCheck(aId) {
      this.$router.push({
        name: "check-tour",
        query: {
          aId,
        },
      });
    },
  },
  data() {
    return {
      totalNum: 0,
      url: "/attraction",
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/attraction",
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
.pic {
  width: 50%;
}
.el-table /deep/ {
  margin: 10px auto;
}
</style>