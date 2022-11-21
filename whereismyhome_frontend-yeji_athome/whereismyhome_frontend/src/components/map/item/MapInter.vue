<template>
  <section class="inter-box p-2" >
    <div class="font-weight-bold">관심 지역</div>
    <div id= "interlist" style="	overflow-x:auto; white-space: nowrap;" >
      <button v-for="(inter, index) in interList" :key="index" class="btn-inter btn btn-warning" data-no="inter.dongCode" type="button">{{inter.dongName }} <a href="#">X</a></button>
    </div>
</section>
</template>

<script>
export default {
  data() {
    return {
      interList:[],
    }
  },
}
</script>

<style>

</style>