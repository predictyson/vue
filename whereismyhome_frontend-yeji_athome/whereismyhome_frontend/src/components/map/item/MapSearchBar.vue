<template>
  <form class="search-box p-5">
    <div class="row col-md-12 mb-2 justify-content-center text-center">
      <input type="hidden" name="act" value="search" />
      <div class="form-group col-md-2">
        <b-form-select
          class="form-select bg-white"
          id="sido"
          name="sido"
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList">
        </b-form-select>
      </div>
      <div class="form-group col-md-2">
        <b-form-select
          class="form-select bg-white text-black"
          id="gugun"
          name="gugun"
          v-model="gugunCode"
          :options="guguns"
          @change="dongList">
        </b-form-select>
      </div>
      <div class="form-group col-md-2">
        <b-form-select
          class="form-select bg-white text-black"
          id="dong"
          name="dong"
          v-model="dongCode"
          :options="dongs">
        </b-form-select>
      </div>
      <div class="form-group col-md-2">
        <b-form-select
          class="form-select bg-white text-black"
          id="year"
          name="year"
          @change="monthList"
          v-model="year"></b-form-select>
      </div>
      <div class="form-group col-md-2">
        <b-form-select class="form-select bg-white text-black" id="month" name="month" v-model="month"> </b-form-select>
      </div>

      <div class="form-group col-md-2">
        <button type="button" id="list-btn" class="btn btn-outline-primary" @click="searchList">
          매매 정보 가져오기
        </button>
        <!--                <button type="submit" id="list-btn" class="btn btn-outline-light">
            매매 정보 가져오기
        </button>-->
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "AppMain",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      year: null,
      month: null,
    };
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.getSido();
  },
  mounted() {
    let date = new Date();
    let yearEl = document.querySelector("#year");
    let yearOpt = `<option value="">매매년도선택</option>`;
    let year = date.getFullYear();
    for (let i = year; i > year - 20; i--) {
      yearOpt += `<option value="${i}">${i}년</option>`;
    }
    yearEl.innerHTML = yearOpt;
  },
  computed: {
    ...mapState(["sidos", "guguns", "dongs"]),
  },
  methods: {
    ...mapActions(["getSido", "getGugun", "getDong", "homeSearch"]),
    ...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_DONG_LIST", "CLEAR_MAP_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },
    searchList() {
      this.CLEAR_MAP_LIST();
      let params = {
        dong: this.dongCode,
        year: this.year,
        month: this.month,
      };
      this.homeSearch(params);
    },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    monthList() {
      let date = new Date();
      let month = date.getMonth() + 1;
      let monthEl = document.querySelector("#month");
      let monthOpt = `<option value="">매매월선택</option>`;
      let yearSel = document.querySelector("#year");
      let m = yearSel[yearSel.selectedIndex].value == date.getFullYear() ? month : 13;
      for (let i = 1; i < m; i++) {
        monthOpt += `<option value="${i < 10 ? "0" + i : i}">${i}월</option>`;
      }
      monthEl.innerHTML = monthOpt;
    },
  },
};
</script>

<style></style>
