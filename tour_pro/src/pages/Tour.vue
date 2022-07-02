<template>
  <div id="tour">
    <div class="head">
      <img :src="info.aPicUrl" :alt="info.aName" />
      <span class="collect"
        >{{ info.aName }}
        <span @click.prevent="change" v-if="user.isTour">
          <img
            src="../assets/imgs/已收藏.png"
            alt="已收藏"
            v-if="isCollected"
          />
          <img src="../assets/imgs/未收藏.png" alt="未收藏" v-else />
        </span>
      </span>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="introduce">
        <template slot="title">
          <div class="title">
            <span></span>
            景区介绍
          </div>
        </template>
        <form class="intro">
          <label>景点描述</label>
          <div>
            {{ info.aDescription }}
          </div>
          <label>地理位置</label>
          <div>{{ info.aLocation }}</div>
          <label>景区评价</label>
        </form>
        <el-rate
          :max="10"
          :value="totalvalue"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
          :colors="colors"
        >
          >
        </el-rate>
      </el-collapse-item>
      <el-collapse-item name="service">
        <template slot="title">
          <div class="title">
            <span></span>
            选择景区服务
          </div>
        </template>
        <ul class="service">
          <li v-for="each in serviceArr" :key="each.pId">
            <el-descriptions title="导游服务" border>
              <el-descriptions-item label="导游名">{{
                each.gNickname
              }}</el-descriptions-item>
              <el-descriptions-item label="导游邮箱">{{
                each.gEmail
              }}</el-descriptions-item>
              <el-descriptions-item label="服务景点">{{
                each.aName
              }}</el-descriptions-item>
              <el-descriptions-item label="价格">
                <el-tag size="small">{{ each.temPrice }}RMB</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="集合点">{{
                each.temMeetingpoint
              }}</el-descriptions-item>
              <el-descriptions-item label="解散点">{{
                each.temDispoint
              }}</el-descriptions-item>
              <el-descriptions-item label="持续时间"
                >{{ each.temDuration }}分钟</el-descriptions-item
              >
              <el-descriptions-item label="最少人数">{{
                each.temMinNum
              }}</el-descriptions-item>
              <el-descriptions-item label="人数上限">{{
                each.temMaxNum
              }}</el-descriptions-item>
            </el-descriptions>
            <el-row>
              <el-button
                type="primary"
                plain
                @click.native="toService(each.pId)"
                v-if="user.isLogin"
                >查看详情</el-button
              >
              <el-button
                type="primary"
                plain
                v-if="user.isTour"
                @click.native="buy(each.pId)"
                >购买服务</el-button
              >
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item name="comments">
        <template slot="title">
          <div class="title">
            <span></span>
            景区评论
          </div>
        </template>
        <ul class="comments">
          <li v-for="each in tourArr" :key="each.caId">
            <div class="user">{{ each.tNickname }}</div>
            <el-rate
              :max="10"
              :value="each.caScore"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
              :colors="colors"
            >
              >
            </el-rate>
            <div class="comment">
              {{ each.caContent }}
            </div>
          </li>
        </ul>
        <Pagination :totalNum="totalNum" :url="url"></Pagination>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Tour",
  components: {
    Pagination,
  },
  computed: {
    ...mapState(["tourArr", "user"]),
  },
  data() {
    return {
      totalNum: 0,
      url: "/comment/attraction",
      info: {},
      isCollected: false,
      coId: 0,
      serviceArr: [],
      activeNames: ["introduce"],
      totalvalue: 0,
      colors: {
        3: "#99A9BF",
        6: { value: "#F7BA2A", excluded: true },
        10: "#FF9900",
      },
    };
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
    buy(pId) {
      this.axios({
        method: "post",
        url: "/tourist/project",
        data: JSON.stringify({
          pid: pId,
          tid: this.user.uid,
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        if (resp.data.code === 200000) {
          this.$notify({
            message: "订购成功",
            type: "success",
          });
        } else {
          this.$notify({
            message: resp.data.msg,
            type: "error",
          });
        }
      });
    },
    change() {
      if (!this.isCollected) {
        this.axios({
          method: "post",
          url: "/tourist/collect",
          data: JSON.stringify({
            aid: this.$route.query.aId,
            check: "0",
            tid: this.user.uid,
          }),
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }).then((resp) => {
          if (resp.data.code === 200000) {
            this.isCollected = true;
            this.coId = resp.data.data.coId;
            this.$notify({
              message: "收藏成功",
              type: "success",
            });
          } else {
            this.$notify({
              message: resp.data.msg,
              type: "error",
            });
          }
        });
      } else {
        this.axios({
          method: "delete",
          url: "/tourist/collect/" + this.coId,
        }).then((resp) => {
          if (resp.data.code === 200000) {
            this.isCollected = false;
            this.$notify({
              message: "取消收藏成功",
              type: "success",
            });
          } else {
            this.$notify({
              message: "取消收藏失败",
              type: "error",
            });
          }
        });
      }
    },
  },
  mounted() {
    // 获取景区信息
    this.axios({
      method: "get",
      url: "/attraction/" + this.$route.query.aId,
    }).then((resp) => {
      if (resp.data.code === 200000) {
        this.info = resp.data.data;
      } else {
        this.$notify({
          message: "景区信息请求失败",
          type: "error",
        });
      }
    });
    // 获取是否收藏
    if (this.user.isLogin) {
      this.axios({
        method: "post",
        url: "/tourist/collect",
        data: JSON.stringify({
          aid: this.$route.query.aId,
          check: "1",
          tid: this.user.uid,
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        if (resp.data.code === 200000) {
          if (resp.data.data.coId) {
            this.isCollected = true;
            this.coId = resp.data.data.coId;
          } else {
            this.isCollected = false;
          }
        } else {
          this.$notify({
            message: "收藏信息请求失败",
            type: "error",
          });
        }
      });
    }
    // 获取景区评分
    this.axios({
      method: "get",
      url: "/attraction/score/" + this.$route.query.aId,
    }).then((resp) => {
      if (resp.data.code === 200000) {
        this.totalvalue = Math.round(resp.data.data * 10) / 10;
      } else {
        this.$notify({
          message: "景区评分请求失败",
          type: "error",
        });
      }
    });
    // 获取景区服务
    this.axios({
      method: "get",
      url: "/project",
      params: {
        pageNum: 1,
        pageSize: 20,
        state: 1,
        aId: this.$route.query.aId,
      },
    }).then((resp) => {
      if (resp.data.code === 200000) {
        this.serviceArr = resp.data.data.rows;
      } else {
        this.$notify({
          message: "景区服务获取失败",
          type: "error",
        });
      }
    });
    // 获取景区评论
    this.axios({
      method: "get",
      url: "/comment/attraction",
      params: {
        pageNum: 1,
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
  },
};
</script>

<style scoped>
.head > img {
  margin: 30px auto;
  width: 50%;
}
.head > span {
  margin-top: -45px;
  display: block;
  text-align: center;
  font-style: italic;
}
.title {
  background-color: GhostWhite;
  font-size: 20px;
  width: 100%;
  text-align: left;
  font-weight: bold;
  color: SlateGrey;
}
.title > span {
  border: 1px solid SkyBlue;
  margin-right: 4px;
}
.intro label {
  width: 100%;
  background-color: #f0f8ff;
  display: block;
  text-align: left;
  font-weight: bolder;
}
.intro div {
  font-weight: bold;
  text-align: left;
  margin-top: 4px;
  text-indent: 2em;
  padding: 20px;
}
.service button {
  margin: 3px 3px;
}
.el-rate {
  display: inline-block;
}
/* 收藏 */
.collect img {
  width: 30px;
}
.collect img:hover {
  cursor: pointer;
}
/* 评论 */
.comments {
  list-style: none;
}
.comments li {
  border: 1px solid whitesmoke;
  margin: 2px auto;
}
.comments /deep/ .el-rate {
  float: left;
}
.user {
  text-align: left;
  font-style: italic;
  font-weight: bold;
  font-size: 18px;
}
.comment {
  clear: both;
  border: 1px solid Azure;
  text-align: left;
  text-indent: 2em;
  font-size: 18px;
}
</style>