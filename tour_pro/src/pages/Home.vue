<template>
  <div id="home">
    <el-carousel :interval="1500" type="card" height="300px">
      <el-carousel-item v-for="each in tourArr" :key="each.aId">
        <img
          :src="each.aPicUrl"
          @click="toTour(each.aId)"
          :alt="each.aName"
        />
      </el-carousel-item>
    </el-carousel>

    <div class="tour">
      <h1 class="tour-title">景区展示</h1>
      <ul class="tour-list">
        <li v-for="each in tourArr" :key="each.aId">
          <div @click="toTour(each.aId)">
            <img
              :src="each.aPicUrl"
              :alt="each.aName"
              class="bot"
            />
            <span>{{each.aName}}</span>
          </div>
        </li>
      </ul>
      <button class="more" @click="toTourList">查看更多 >>></button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    ...mapState(["tourArr"]),
  },
  methods: {
    ...mapMutations(["setTourArr"]),
    toTour(aId) {
      this.$router.push({
        name: "tour",
        query: {
          aId,
        },
      });
    },
    toTourList() {
      this.$router.push({
        name: "tour-list",
      });
    },
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/attraction",
      params: {
        pageNum: 1,
        pageSize: 5,
        aState: 1,
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
#home {
  height: 1000px;
}
.el-carousel {
  margin-top: 5px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 景区列表展示 */
.tour-title {
  text-align: left;
  width: 100%;
  padding-left: 25px;
  color: DeepSkyBlue;
  background: linear-gradient(to right, #f0ffff, #f0f8ff);
  font-style: italic;
}
.tour-list {
  list-style: none;
  display: flex;
  justify-content: space-around;
}
.tour-list li {
  margin: 0 2px;
}
/* 景区图片 */
img {
  width: 100%;
}
.bot {
  width: 100%;
  height: 200px;
}
span {
  color: whitesmoke;
  background-color: rgba(0, 0, 0, 0.5);
  width: 101%;
  height: 25px;
  display: block;
  position: relative;
  top: -18px;
}
img:hover,
span:hover {
  cursor: pointer;
}
.more {
  width: 90px;
  height: 35px;
  border: transparent;
  box-shadow: 1px 1px 5px #888888;
  font-size: 10px;
  color: #888888;
}
.more:hover {
  background-color: DarkGrey;
  cursor: pointer;
}
</style>