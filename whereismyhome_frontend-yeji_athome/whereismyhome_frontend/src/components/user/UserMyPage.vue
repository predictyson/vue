<template>
  <div>
    <h2>MyPage</h2>
    <b-container id="mypage" style="height: 450px" class="mt -5 px -5">
      <b-form-group id="input-group-2" label="아이디" label-for="input-2">
        <b-form-input id="userid" v-model="this.checkUserInfo.userId" readonly></b-form-input>
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="이름" label-for="input-2">
        <b-form-input id="userid" v-model="this.checkUserInfo.userName" readonly></b-form-input>
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="이메일" label-for="input-2">
        <input
          readonly
          type="text"
          class="form-control"
          id="email"
          name="email"
          v-model="this.getEmail"
        />
      </b-form-group>
      <br />
      <b-form-group id="input-group-2" label="가입 일자" label-for="input-2">
        <b-form-input id="userid" v-model="this.checkUserInfo.joinDate" readonly></b-form-input>
      </b-form-group>
      <br />
      <div class="bnt-group">
        <b-button @click="mypageModify" type="submit" variant="primary" class="m-2"
          >회원정보 수정</b-button
        >
        <b-button @click="deleteUser" type="reset" variant="danger">회원 탈퇴</b-button>
      </div>
    </b-container>
  </div>
</template>

<script src="components/sweetalert/dist/sweetalert.min.js"></script>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import http from '@/api/http';
const memberStore = 'memberStore';
export default {
  data() {
    return {
      show: true,
    };
  },

  methods: {
    ...mapActions(memberStore, [
      'userLogout',
      'userConfirm',
      'getUserInfo',
      'userDelete',
      'userLogout',
    ]),
    ...mapMutations(memberStore, ['SET_SAVE_ID', 'CLEAR_SAVE_ID', 'SET_MODAL_VIEW', 'SET_EMAIL']),
    async confirm() {
      let token = sessionStorage.getItem('access-token');
      await this.getUserInfo(token);
      // console.log(userInfo);
    },

    logout() {
      this.userLogout(this.userInfo.userId);
      sessionStorage.removeItem('access-token');
      sessionStorage.removeItem('refresh-token');
    },
    deleteUser() {
      this.$swal({
        title: '정말 탈퇴하시겠습니까?',
        icon: 'warning',
        dangerMode: true,
        buttons: true,
      })
        // .then(() => this.userDelete(this.userInfo.userId))
        .then(() => this.userDelete(this.userInfo.userId))
        .then(() =>
          this.$swal({
            title: '성공적으로 회원탈퇴되었습니다.',
            icon: 'success',
          })
            .then(() => this.$emit('close'))
            .then(() => this.logout()),
        );
    }, // delete user end
    mypageModify() {
      this.SET_MODAL_VIEW('mypageModify');
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
.bnt-group {
  float: right;
}
</style>
