<template>
    <b-container id="form-login" style="height:400px" class="mt-5 px-5">
        <b-row class="text-center mb-5" cols="4" style="font-size: 1.5rem">로그인</b-row>
        <b-row class="mb-3">
            <input
            type="text"
            class="form-control"
            id="userid"
            name="userid"
            placeholder="아이디..."
            v-model="user.userId"
            @keyup.enter="chkVal" />
        </b-row>
        <b-row class="mb-3">
            <input
            type="password"
            class="form-control"
            id="userpwd"
            name="userpwd"
            placeholder="패스워드..."
            v-model="user.userPwd"
            @keyup.enter="chkVal" />
        </b-row>
        <b-row class="mb-3">
            <b-col>
            <input class="mr-1" type="checkbox" value="ok" id="saveid" name="saveid" v-model="save" />
            <label class="mb-0" for="saveid"> 아이디저장 </label>
            </b-col>
        </b-row>
        <b-row class="text-center">
            <button type="button" id="btn-login" class="btn btn-primary mb-3 " @click="chkVal">Login</button>
        </b-row>
        <b-row class="mb-3 text-center" >
            <b-col class="text-left" @click="join" >
                회원가입
            </b-col>
            <b-col class="text-right" @click="findPwd">
                비밀번호 찾기
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
const memberStore = "memberStore";
export default {
    name:"UserLoogin",
    data() {
    return {
      user: {
        userId: "",
        userPwd: "",
      },
      save: false,
    };
  },
  methods: {
    ...mapActions(memberStore, ["userLogout", "userConfirm", "getUserInfo"]),
    ...mapMutations(memberStore, ["SET_SAVE_ID", "CLEAR_SAVE_ID", "SET_MODAL_VIEW"]),
    
    async confirm() {
      if(this.save){
        this.SET_SAVE_ID(this.user.userId);
      }
      else{
        this.CLEAR_SAVE_ID();
      }
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$emit("close");
      }
    },

    chkVal() {
      if (this.user.userId.length === 0) {
        alert("아이디를 적어주세요!");
      } else if (this.user.userPwd.length === 0) {
        alert("비밀번호를 적어주세요!");
      } else {
        this.confirm();
      }
    },

    join(){
        this.SET_MODAL_VIEW("join");
    },
    findPwd(){
        this.SET_MODAL_VIEW("findPwd");
    }
    
  },
  computed: {
    ...mapState(memberStore, ["saveId", "userInfo", "isLogin", "isLoginError"]),
    ...mapGetters(memberStore, ["checkUserInfo"]),
  },
  created() {
    this.user.userId = this.saveId;
    if (this.user.userId) {
      this.save = true;
    }
  },

}
</script>

<style>

</style>