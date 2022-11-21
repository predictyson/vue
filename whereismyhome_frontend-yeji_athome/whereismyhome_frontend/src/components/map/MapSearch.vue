<template>
  <main>
    <!-- <section class="container-fluid bg-black justify-content-center text-center"> -->
    <!-- <map-search-bar></map-search-bar> -->
    <!-- </section> -->
    <!-- <map-inter></map-inter> -->
    <section class="home-result-box">
      <div>
        <!-- <div class="mt-2">Value: {{ text }}</div> -->
      </div>
      <div class="search-result">
        <div class="table-box col-sm-12 col-md-3 overflow-auto">
          <b-input-group size="sm" prepend="">
            <b-form-input v-model="text" placeholder="Enter your place"></b-form-input>
          </b-input-group>
          <!-- <table class="table table-hover text-center col-sm-12">
            <thead>
              <tr>
                <th>거래내역</th>
              </tr>
            </thead>
            <tbody id="aptlist" v-if="mapList.length === 0">
              <tr>
                <td>거래내역 없음</td>
              </tr>
            </tbody>
            <tbody id="aptlist" v-else>
              <tr v-for="(apt, index) in mapList" :key="index" class="apt-item" :lat="apt.lat" :lng="apt.lng">
                <td>
                  <div class="apt-name">
                    <a>{{ apt.apartmentName }}</a>
                  </div>
                  <div>
                    <b-img src="http://localhost/assets/img/coffee.png" width="20" height="20" class="icon"></b-img
                    ><span
                      v-if="apt.coffee"
                      style="font-size: 12px"
                      class="text-success"
                      v-text="`${apt.coffee.name} ${apt.coffee.dist}m`"></span>
                    <b-img src="http://localhost/assets/img/metro.png" width="20" height="20" class="icon"></b-img
                    ><span
                      v-if="apt.metro"
                      style="font-size: 12px"
                      v-text="`${apt.metro.name} ${apt.metro.dist}m`"></span>
                  </div>
                  <div class="apt-space" v-text="`면적 : ${apt.area}`"></div>
                  <div class="apt-price" v-text="`거래금액 : ${apt.dealAmount}만원`"></div>
                  <div class="apt-space" v-text="`면적 : ${apt.area}`"></div>
                  <div class="apt-price" v-text="`거래금액 : ${apt.dealAmount}만원`"></div>
                  <div class="apt-date text-end">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="icon" viewBox="0 0 24 24">
                        <path
                          d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path>
                      </svg>
                    </span>
                    <span v-text="`${apt.dealYear}.${apt.dealMonth}.${apt.dealDay}`"> </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table> -->
        </div>
        <div id="home-map" class="col-sm-12 col-md-9"><ka-kao-map></ka-kao-map></div>
      </div>
    </section>
  </main>
</template>

<script>
// import MapSearchBar from "@/components/map/item/MapSearchBar.vue";
// import MapInter from "@/components/map/item/MapInter.vue";
import { mapState } from "vuex";
import KaKaoMap from "./KakaoMap.vue";
export default {
  components: {
    KaKaoMap,
    // MapSearchBar,
    // MapInter,
  },
  data() {
    return {
      text: "",
    };
  },
  computed: {
    ...mapState(["mapList"]),
  },
};
</script>

<style></style>
