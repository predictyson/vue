<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <h2>아파트 목록</h2>
    <input type="number" v-model="lawdCd" />
    <input type="number" v-model="dealYmd" />
    <button @click="getAptList">아파트목록열기</button>
    <table>
      <colgroup>
        <col style="width: 10%" />
        <col style="width: 30%" />
        <col style="width: 20%" />
        <col style="width: 10%" />
        <col style="width: 30%" />
      </colgroup>
      <tr>
        <td>일련번호</td>
        <td>아파트명</td>
        <td>법정동</td>
        <td>층</td>
        <td>매매가격</td>
      </tr>
      <tbody>
        <apt-list-item v-for="(apt, index) in apts" :key="index" :apt="apt"></apt-list-item>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import AptListItem from "@/components/AptListItem.vue";
export default {
  name: "AptList",
  components: {
    AptListItem,
  },
  data() {
    return {
      lawdCd: "11110",
      dealYmd: "202207",
      apts: [],
    };
  },
  methods: {
    getAptList() {
      // const serviceKey =
      //   "z22Bk%2BacD4qnIYeD79oWvPw%2FyuMrqvvhaDK4hg%2BXsynDXgjASv1t6kfOPoEdWUbw0hWjAAO0wPvRshTNobPGPQ%3D%3D";
      // // eslint-disable-next-line no-unused-vars
      // const url = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=${serviceKey}&pageNo=1&numOfRows=10&LAWD_CD=${this.lawdCd}&DEAL_YMD=${this.dealYmd}`;
      const url = `http://localhost:9999/vue/map/aptlist/${this.lawdCd}/${this.dealYmd}`;
      axios.get(url).then((response) => (this.apts = response.data.response.body.items.item));
    },
  },
};
</script>
<style>
td {
  border-bottom: 1px solid black;
}
</style>
