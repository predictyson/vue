<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글보기</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="userInfo.userId === `${article.userid}`">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form>
          <b-form-group id="userid-group" style="height: auto" label="작성자:" label-for="userid">
            <b-form-input
              id="user"
              v-model="article.userid"
              type="text"
              required
              placeholder="작성자 입력..."
              readonly></b-form-input>
          </b-form-group>

          <b-form-group id="subject-group" style="height: auto" label="제목:" label-for="subject">
            <b-form-input
              id="subject"
              v-model="article.subject"
              type="text"
              required
              placeholder="제목 입력..."
              readonly></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" style="height: auto" label="내용:" label-for="content">
            <b-form-textarea
              id="content"
              v-model="article.content"
              placeholder="내용 입력..."
              rows="10"
              max-rows="15"
              readonly></b-form-textarea>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <!-- <b-card
          :header-html="`<span><h6>${memo.userid}</h6></span><span><h6>${memo.memotime}</h6></span>`"
          class="mb-2"
          border-variant="dark"
          no-body> -->
        <b-form-textarea
          id="textarea-no-resize"
          rows="3"
          no-resize
          placeholder="댓글을 입력해주세요"
          v-model="memo.comment"
          ></b-form-textarea>
        <!-- <b-card-body class="text-left">
          <textarea v-model="memo.comment"></textarea>
        </b-card-body> -->
        <!-- </b-card> -->
      </b-col>
      <div v-if="adminChk">
        <b-button
          variant="outline-success"
          size="sm"
          class="m-2"
          style="float: right"
          @click="writeMemo"
          v-if="!isMemo"
          >댓글 작성</b-button
        >
        <b-button
          variant="outline-primary"
          class="m-2"
          style="float: right"
          size="sm"
          @click="modifyMemo"
          v-if="isMemo"
          >댓글 수정</b-button
        >
        <b-button
          variant="outline-danger"
          class="m-2"
          style="float: right"
          size="sm"
          @click="deleteMemo"
          v-if="isMemo"
          >댓글 삭제</b-button
        >
      </div>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import http from "@/api/http";
import { mapState, mapGetters } from "vuex";
const memberStore = "memberStore";
export default {
  name: "QnaDetail",

  data() {
    return {
      isMemo: false,
      article: {},
      memo: {
        memono: "",
        userid: "admin",
        memotime: "",
        comment: "",
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(memberStore, ["adminChk"]),
  },
  created() {
    http
      .get(`/qna/${this.$route.params.articleno}`)
      .then(({ data }) => {
        this.article = data;
        return null;
      })
      .then(() => {
        http.get(`/memo/${this.$route.params.articleno}`).then(({ data }) => {
          if (data.length != 0) {
            this.memo = data;
            this.isMemo = true;
          }
        });
      })
      .catch(() => {
        alert("글 불러오기 중 문제 발생");
      });
  },
  methods: {
    refreshAll() {
      // 새로고침
      this.$router.go();
    },
    writeMemo() {
      if(this.memo.comment.length < 1){
        alert("댓글을 작성해주세요!");
        return;
      }
      http
        .post("/memo", {
          articleno: this.article.articleno,
          comment: this.memo.comment,
          userid: "admin",
        })
        .then(({ data }) => {
          let msg = "답글 등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "답글 등록이 완료되었습니다.";
            this.isMemo = true;
          }
          alert(msg);
        });
    },
    modifyMemo() {
      if(this.memo.comment.length < 1){
        alert("댓글을 작성해주세요!");
        return;
      }
      http
        .put("/memo", {
          articleno: this.articleno,
          comment: this.memo.comment,
          userid: "admin",
          memono: this.memo.memono,
        })
        .then(({ data }) => {
          let msg = "답글 수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "답글 수정이 완료되었습니다.";
          }
          alert(msg);
        });
    },
    deleteMemo() {
      http.delete("/memo", { params: { memono: this.memo.memono } }).then(({ data }) => {
        let msg = "답글 삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "답글 삭제가 완료되었습니다.";
          this.isMemo = false;
          this.memo.comment = ""; 
        }
        alert(msg);
      });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "qnamodify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$router.replace({
          name: "qnadelete",
          params: { articleno: this.article.articleno },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "qnalist" });
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
