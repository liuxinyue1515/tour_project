<template>
  <div id="tour-list">
    <div id="tour-show">
      <el-row :gutter="20" v-for="row in rows()" :key="row">
        <el-col :span="6" v-for="col in cols(row)" :key="col">
          <div @click="toTour(tourArr[index(row, col)].aId)">
            <img
              :src="tourArr[index(row, col)].aPicUrl"
              :alt="tourArr[index(row, col)].aName"
            />
            <span>{{ tourArr[index(row, col)].aName }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <Pagination :totalNum="totalNum" :url="url" :aState="aState"></Pagination>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "TourList",
  components: {
    Pagination,
  },
  data() {
    return {
      totalNum: 0,
      url: "/attraction",
      aState: 1,
    };
  },
  computed: {
    ...mapState(["tourArr"]),
  },
  methods: {
    ...mapMutations(["setTourArr"]),
    rows() {
      return this.tourArr.length === 0
        ? 0
        : parseInt((this.tourArr.length - 1) / 4) + 1;
    },
    cols(row) {
      return row < this.rows() ? 4 : this.tourArr.length - (row - 1) * 4;
    },
    index(row, col) {
      return (row - 1) * 4 + col - 1;
    },
    toTour(aId) {
      this.$router.push({
        name: "tour",
        query: {
          aId,
        },
      });
    },
  },
  mounted() {
    if (this.$route.query.search) {
      this.axios({
        method: "get",
        url: "/attraction",
        params: {
          pageNum: 1,
          pageSize: 20,
          aState: 1,
          keyword: this.$route.query.search,
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
        url: "/attraction",
        params: {
          pageNum: 1,
          pageSize: 20,
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
    }
  },
};
</script>

<style scoped>
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
/* 景区图片 */
img {
  width: 100%;
  height: 250px;
}
span {
  color: whitesmoke;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 25px;
  display: block;
  position: relative;
  top: -18px;
}
img:hover,
span:hover {
  cursor: pointer;
}
</style>