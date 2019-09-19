<template>
  <v-app>
    <page-progress-loader></page-progress-loader>
    <navbar></navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AuthService from './services/AuthService';
import Navbar from './components/layout/Navbar.vue';
import PageProgressLoader from './components/common/PageProgressLoader.vue';

export default {
  components: {
    PageProgressLoader,
    Navbar,
  },
  mounted() {
    // If the user has singed in save his/her details in the Vuex store
    if (AuthService.isAuthorized()) {
      const token = AuthService.getUserTokenFromLocalStorage();
      const user = AuthService.getUserFromLocalStorage();

      this.$store.commit('auth/setToken', token);
      this.$store.commit('auth/setUser', user);
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
