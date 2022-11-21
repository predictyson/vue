<template>
  <div>
    <h2>회원 정보 수정</h2>
    <b-container id="mypage" style="height: 450px" class="mt -5 px -5">
      <b-form-group id="input-group-2" label="아이디" label-for="input-2">
        <b-form-input id="userid" v-model="user.userId"></b-form-input>
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="이름" label-for="input-2">
        <b-form-input id="username" v-model="user.userName"></b-form-input>
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="이메일" label-for="input-2">
        <div class="email-wrapper">
          <b-form-input id="emailId" v-model="user.emailId" style="width: 180px"></b-form-input><span>@</span>
          <b-form-input id="emailDomain" v-model="user.enmailDomain" style="width: 220px"></b-form-input>
        </div>
        <!-- <input type="text" class="form-control" id="email" name="email" v-model="user.userEmail" /> -->
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="가입 일자" label-for="input-2">
        <b-form-input id="userid" v-model="user.joinDate" readonly></b-form-input>
      </b-form-group>
      <br />
      <div class="bnt-group">
        <b-button @click="mypageModify" type="submit" variant="primary" class="m-2">수정 하기</b-button>
      </div>
    </b-container>
  </div>
</template>

<script src="components/sweetalert/dist/sweetalert.min.js"></script>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import http from "@/api/http";
const memberStore = "memberStore";
export default {
  data() {
    return {
      user: {
        userId: "",
        userName: "",
        userEmail: "",
        emailId: "",
        emailDomain: "",
        joinDate: "",
      },
      show: true,
    };
  },

  methods: {
    ...mapActions(memberStore, ["userLogout", "userConfirm", "getUserInfo", "userModify"]),
    ...mapMutations(memberStore, ["SET_SAVE_ID", "CLEAR_SAVE_ID", "SET_MODAL_VIEW", "SET_EMAIL", "SET_USER_INFO"]),
    async mypageModify() {
      await this.userModify(this.user)
        .then(() => console.log("회원 정보 수정 완료"))
        .catch(() => console.log("회원 정보 수정 실패"));
      this.$swal("회원 정보 수정 완료하였습니다.", { icon: "success" }).then(() => this.$emit("close"));
      this.SET_USER_INFO(this.user);
      this.SET_EMAIL(this.user);
    },
  },
  computed: {
    ...mapState(memberStore, ["saveId", "userInfo", "isLogin", "isLoginError", "email"]),
    ...mapGetters(memberStore, ["checkUserInfo", "getEmail"]),
  },
  created() {
    this.user.userId = this.userInfo.userId;
    this.user.joinDate = this.userInfo.joinDate;
  },
};
</script>

<style></style>
