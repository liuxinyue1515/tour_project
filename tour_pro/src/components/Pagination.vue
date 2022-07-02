<template>
<!-- 分页组件 -->
  <div id="pagination">
    <el-pagination
      :page-size="20"
      :current-page="currentPage"
      :total="totalNum"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Pagination",
  props: ["totalNum", "url", "aState"],
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    ...mapMutations(["setTourArr"]),
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.url === "/template") {
        this.axios({
          method: "get",
          url: "/template",
          params: {
            pageNum: this.currentPage,
            pageSize: 20,
            gId: this.user.uid,
          },
        }).then((resp) => {
          if (resp.data.code === 200000) {
            this.setTourArr(resp.data.data.rows);
          } else {
            this.setTourArr([]);
          }
        });
      } else if (this.url === "/tourist/collect") {
        this.axios({
          method: "get",
          url: "/tourist/collect",
          params: {
            pageNum: this.currentPage,
            pageSize: 20,
            tId: this.user.uid,
          },
        }).then((resp) => {
          if (resp.data.code === 200000) {
            this.setTourArr(resp.data.data.rows);
            this.totalNum = parseInt(resp.data.data.totalNum);
          } else {
            this.setTourArr([]);
            this.$notify({
              message: "出行计划获取失败",
              type: "error",
            });
          }
        });
      } else if (this.url === "/project") {
        if (this.user.fromAdmin) {
          this.axios({
            method: "get",
            url: "/project",
            params: {
              pageNum: this.currentPage,
              pageSize: 20,
              state: this.aState,
            },
          }).then((resp) => {
            if (resp.data.code === 200000) {
              this.setTourArr(resp.data.data.rows);
            } else {
              this.setTourArr([]);
            }
          });
        } else if (this.user.isTour) {
          this.axios({
            method: "get",
            url: "/project",
            params: {
              pageNum: this.currentPage,
              pageSize: 20,
              state: this.aState,
              tId: this.user.uid,
            },
          }).then((resp) => {
            if (resp.data.code === 200000) {
              this.setTourArr(resp.data.data.rows);
            } else {
              this.setTourArr([]);
              this.$notify({
                message: "请求购买信息失败",
                type: "error",
              });
            }
          });
        } else {
          this.axios({
            method: "get",
            url: "/project",
            params: {
              pageNum: this.currentPage,
              pageSize: 20,
              state: this.aState,
              gId: this.user.uid,
            },
          }).then((resp) => {
            if (resp.data.code === 200000) {
              this.setTourArr(resp.data.data.rows);
            } else {
              this.setTourArr([]);
            }
          });
        }
      } else if (this.url === "/comment/attraction") {
        this.axios({
          method: "get",
          url: "/comment/attraction",
          params: {
            pageNum: this.currentPage,
            pageSize: 20,
            aId: this.$route.query.aId,
          },
        }).then((resp) => {
          if (resp.data.code === 200000) {
            this.setTourArr(resp.data.data.rows);
            this.totalNum = parseInt(resp.data.data.totalNum);
          } else {
            this.setTourArr([]);
            this.$notify({
              message: "景区评论获取失败",
              type: "error",
            });
          }
        });
      } else {
        this.axios({
          method: "get",
          url: this.url,
          params: {
            pageNum: this.currentPage,
            pageSize: 20,
            aState: this.aState,
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }).then((resp) => {
          if (resp.data.code === 200000) {
            this.setTourArr(resp.data.data.rows);
          } else {
            this.setTourArr([]);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
#pagination {
  background-color: GhostWhite;
}
</style>