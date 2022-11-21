<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-form class="d-flex" id="form-search" action="">
          <select
            class="form-select form-select-sm ms-5 me-1 w-50"
            id="skey"
            name="key"
            aria-label="검색조건"
            v-model="skey"
          >
            <option value="" selected>검색조건</option>
            <option value="subject" >제목</option>
            <option value="userid" >작성자</option>
          </select>
          <div class="input-group input-group-sm">
            <input type="text" class="form-control" id="sword" name="word" placeholder="검색어..." v-model="sword" />
            <button id="btn-search" class="btn btn-dark" type="button" @click="searchArticle">검색</button>
          </div>
        </b-form>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table class="text-center" striped hover :items="articles" :fields="fields" @row-clicked="viewArticle" style="cursor:pointer"> </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/api/http";

export default {
  name: "QnaList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      skey: "",
      sword: "",
    };
  },
  created() {
    http.get(`/qna`).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "qnawrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "qnaview",
        params: { articleno: article.articleno },
      });
    },
    searchArticle() {
      http.get(`/qna`, { params: { key: this.skey, word: this.sword } }).then(({ data }) => {
        this.articles = data;
      })
    }
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: center;
}
th > div{
  text-align: center;
}
</style>
