<template>
  <v-app-bar
    app
    v-if="isUserAuthenticated"
    color="primary"
    dark>

    <router-link text to="/" class="logo title white--text">
      Vue Social Network
    </router-link>

    <v-spacer></v-spacer>

    <v-list-item
      class="user-profile-details-container white--text"
      :to="{ name: 'user-profile', params: { user_id: user.id } }"
      active-class="no-opacity">
      <v-list-item-avatar v-if="user.image">
        <lazy-image :src="user.image" width="100%" loader-color="white"></lazy-image>
      </v-list-item-avatar>
      <v-list-item-title>{{ user.firstname }} {{ user.lastname }}</v-list-item-title>
    </v-list-item>

    <v-btn text icon @click="logoutHandler">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import AuthService from '../../services/AuthService';
import LazyImage from '../common/LazyImage.vue';

export default {
  components: {
    LazyImage,
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
    ...mapGetters({
      isUserAuthenticated: 'auth/isUserAuthenticated',
    }),
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    logoutHandler() {
      AuthService.logout();
      this.logout();
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  text-decoration: none !important;
}

.user-profile-details-container {
  flex-basis: unset;
  flex-grow: unset;
}

.no-opacity::before {
  opacity: 0 !important;
}
</style>
