<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>
  <tr>
    <td>{{ apt.일련번호 }}</td>
    <td>{{ apt.아파트 }}</td>
    <td>{{ apt.법정동 }}</td>
    <td>{{ apt.층 }}</td>
    <td>{{ apt.거래금액 }}만원</td>
  </tr>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
export default {
  name: "AptListItem",
  props: {
    apt: Object,
  },
};
</script>

<style scoped>
td {
  font-weight: bold;
  border-bottom: 2px solid rgb(63, 90, 66);
}
</style>
