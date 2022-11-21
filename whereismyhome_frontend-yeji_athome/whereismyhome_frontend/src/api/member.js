import api from './http.js';

async function login(user, success, fail) {
  await api.post(`/user/login`, user).then(success).catch(fail);
}
// 회원 인증
async function findById(userid, success, fail) {
  api.defaults.headers['access-token'] = sessionStorage.getItem('access-token');
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}
// access token 재 발급
async function tokenRegeneration(user, success, fail) {
  api.defaults.headers['refresh-token'] = sessionStorage.getItem('refresh-token'); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

// 회원정보 수정
async function modifyMypage(user, success, fail) {
  await api.put(`/user/`, user).then(success).catch(fail);
}

// 회원가입
async function register(user, success, fail) {
  await api.post(`/user/join`, user).then(success).catch(fail);
}

// id check
async function idCheck(userid, success, fail) {
  await api.get(`/user/search/${userid}`).then(success).catch(fail);
}

// 회원 탈퇴
async function deleteUser(userid, success, fail) {
  await api.delete(`/user/${userid}`).then(success).catch(fail);
}

// 비밀번호 재발급
async function findPwd(user, success, fail) {
  await api.post(`/user.findpw`, user).then(success).catch(fail);
}
export {
  login,
  findById,
  tokenRegeneration,
  logout,
  modifyMypage,
  register,
  idCheck,
  deleteUser,
  findPwd,
};
