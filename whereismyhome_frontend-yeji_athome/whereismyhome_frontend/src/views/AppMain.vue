<template>
  <main>
    <section class="container-fluid main-banner p-5">
      <div class="banner-title-box">
        <div class="banner-title display-3 text-center p-5 text-white border-bottom border-2">FIND HOME</div>
        <map-search-bar></map-search-bar>
      </div>
    </section>
  </main>
</template>

<script>
import MapSearchBar from '@/components/map/item/MapSearchBar.vue';
export default {
  name: "AppMain",
  data() {
    return {

    }
  },
  components:{
    MapSearchBar
  },

  
};
</script>

<style></style>
