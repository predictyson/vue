<template>
  <div>
    <h2>비밀번호 찾기</h2>
    <b-container
      v-if="isFound === false"
      id="비밀번호 찾기"
      style="height: 300px"
      class="mt -5 px -5"
    >
      <b-form-group id="input-group-2" label="아이디" label-for="input-2">
        <b-form-input id="userid" v-model="user.userId"></b-form-input>
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="이메일" label-for="input-2">
        <div class="email-wrapper">
          <b-form-input id="emailId" v-model="user.emailId" style="width: 180px"></b-form-input
          ><span>@</span>
          <b-form-input
            id="emailDomain"
            v-model="user.enmailDomain"
            style="width: 220px"
          ></b-form-input>
        </div>
      </b-form-group>
      <b-button
        class="findBtn"
        @click="findpwd"
        type="submit"
        variant="primary"
        style="float: right"
        >비밀번호 찾기</b-button
      >
    </b-container>
    <b-container v-else-if="isFound === true"></b-container>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
const memberStore = 'memberStore';
export default {
  name: 'findPwd',
  data() {
    return {
      user: {
        userId: '',
        emailId: '',
        emailDomain: '',
      },
      isFound: false,
    };
  },
  methods: {
    ...mapActions(memberStore, ['findPassword']),
    ...mapMutations(memberStore, ['SET_USER_INFO']),
    async findpwd() {
      if (
        this.user.userId === this.checkUserInfo.userId &&
        this.user.emailId === this.checkUserInfo.emailId &&
        this.user.emailDomain === this.checkUserInfo.emailDomain
      ) {
        await this.findPassword(this.user);
        this.isFound = true;
      }
    },
  },
  computed: {
    ...mapState(memberStore, ['saveId', 'userInfo', 'isLogin', 'isLoginError', 'email']),
    ...mapGetters(memberStore, ['checkUserInfo', 'getEmail']),
  },
};
</script>

<style>
h2 {
  text-align: center;
  padding: 20px 0;
}
.findBtn {
  margin-top: 30px;
}
</style>
