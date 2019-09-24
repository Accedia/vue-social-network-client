<template>
  <v-progress-linear
    v-if="isLoading"
    color="white"
    class="main-page-loader"
    indeterminate></v-progress-linear>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    isLoading: 'loader/isLoading',
  }),
};
</script>

<style lang="scss" scoped>
.main-page-loader {
  z-index: 10000;
  margin: 0;
}
</style>
