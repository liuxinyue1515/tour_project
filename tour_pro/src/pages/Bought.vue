<template>
  <div id="bought">
    <div class="tablename">已购服务</div>
    <el-table
      :data="tourArr"
      max-height="500"
      border
      style="width: 95%"
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="aName" label="景点"> </el-table-column>
      <el-table-column prop="gNickname" label="导游名"> </el-table-column>
      <el-table-column prop="gEmail" label="导游邮箱"> </el-table-column>
      <el-table-column prop="temDuration" label="持续时间"> </el-table-column>
      <el-table-column prop="temMeetingpoint" label="集合点"> </el-table-column>
      <el-table-column prop="temDispoint" label="解散点"> </el-table-column>
      <el-table-column prop="temPrice" label="价格"> </el-table-column>
      <el-table-column prop="temMinNum" label="最少人数"> </el-table-column>
      <el-table-column prop="temMaxNum" label="人数上限"> </el-table-column>
      <el-table-column prop="pNum" label="当前人数"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag
            type="danger"
            size="small"
            v-if="compare(scope.row.pNum, scope.row.temMinNum)"
            >人数未达到</el-tag
          >
          <el-tag type="success" size="small" v-else>人数已达到</el-tag>
          <span> </span>
        </template>
      </el-table-column>
      <el-table-column prop="pStartTime" label="开始时间" width="250">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native="toService(scope.row.pId)"
            type="text"
            size="small"
            >查看详情</el-button
          >
          <br />
          <el-button type="text" size="small" @click="comment(scope.row.aId)"
            >景区评价</el-button
          >
          <br />
          <el-button type="text" size="small" @click="doDelete(scope.row.ptId)"
            >服务退订</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="景区评价"
      :visible.sync="dialogFormVisible"
      center
      top="35vh"
    >
      <el-form :model="form">
        <el-form-item label="景点评价:">
          <br />
          <el-rate
            v-model="form.value"
            :max="10"
            show-score
            text-color="#ff9900"
            :colors="form.colors"
          ></el-rate>
        </el-form-item>
        <el-form-item label="景点评论:">
          <el-input type="textarea" v-model="form.desc" :rows="5"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doComment">确 定</el-button>
      </div>
    </el-dialog>
    <Pagination :totalNum="totalNum" :url="url" :aState="aState"></Pagination>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Bought",
  components: {
    Pagination,
  },
  computed: {
    ...mapState(["tourArr", "user"]),
  },
  methods: {
    ...mapMutations(["setTourArr"]),
    toService(pId) {
      this.$router.push({
        name: "service",
        query: {
          pId,
        },
      });
    },
    comment(aId) {
      this.form.aId = aId;
      this.dialogFormVisible = true;
    },
    doComment() {
      if (this.form.desc === "") {
        this.$notify({
          message: "评论不得为空",
          type: "error",
        });
        return;
      }
      this.axios({
        method: "post",
        url: "/comment/attraction",
        data: JSON.stringify({
          aid: this.form.aId,
          caContent: this.form.desc,
          caScore: this.form.value,
          tid: this.user.uid,
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        if (resp.data.code === 200000) {
          this.$notify({
            message: "评论成功",
            type: "success",
          });
        } else {
          this.$notify({
            message: resp.data.msg,
            type: "error",
          });
        }
      });
      this.form.desc = "";
      this.form.value = 0;
      this.dialogFormVisible = false;
    },
    compare(n1, n2) {
      return parseInt(n1) < parseInt(n2);
    },
    doDelete(ptId) {
      if (confirm("确认退订?")) {
        this.axios({
          method: "delete",
          url: "/tourist/project/" + ptId,
        }).then((resp) => {
          if (resp.data.code === 200000) {
            for (let i = 0; i < this.tourArr.length; i++) {
              if (this.tourArr[i].ptId === ptId) {
                this.tourArr.splice(i, 1);
                break;
              }
            }
            this.totalNum--;
            this.$notify({
              message: "退订成功",
              type: "success",
            });
          } else {
            this.$notify({
              message: "退订失败",
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
      url: "/project",
      aState: 1,
      form: {
        aId: 0,
        desc: "",
        value: 0,
        colors: {
          3: "#99A9BF",
          6: { value: "#F7BA2A", excluded: true },
          10: "#FF9900",
        },
      },
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/project",
      params: {
        pageNum: 1,
        pageSize: 20,
        state: 1,
        tId: this.user.uid,
      },
    }).then((resp) => {
      if (resp.data.code === 200000) {
        this.setTourArr(resp.data.data.rows);
        this.totalNum = parseInt(resp.data.data.totalNum);
      } else {
        this.setTourArr([]);
        this.$notify({
          message: "请求购买信息失败",
          type: "error",
        });
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
.el-form-item {
  margin-bottom: 10px;
}
</style>