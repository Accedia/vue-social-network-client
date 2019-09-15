<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import AuthService from './services/AuthService';

export default {
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
