<template>
  <div>
    <user-profile-card v-if="user !== null && !error" :user="user"></user-profile-card>
    <v-alert v-if="error !== null" type="error">
      {{ error }}
    </v-alert>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import UserService from '../services/UserService';
import UserProfileCard from '../components/users/UserProfileCard.vue';

export default {
  components: {
    UserProfileCard,
  },
  data() {
    return {
      user: null,
      error: null,
    };
  },
  computed: mapGetters({
    isLoading: 'loader/isLoading',
  }),
  methods: mapMutations({
    showLoader: 'loader/showLoader',
    hideLoader: 'loader/hideLoader',
  }),
  async mounted() {
    const userId = this.$route.params.user_id;

    this.showLoader();

    try {
      this.user = await UserService.getUserProfile(userId);
    } catch (error) {
      console.error(error);
      this.error = error;
    }

    this.hideLoader();
  },
  beforeDestroy() {
    if (this.isLoading) {
      this.hideLoader();
    }
  },
};
</script>
