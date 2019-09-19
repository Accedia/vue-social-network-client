<template>
  <v-card :loading="loading">
    <v-card-text class="py-6">
      <v-layout class="align-center">
        <v-list-item-avatar v-if="user.image">
          <lazy-image :src="user.image" width="100%" loader-color="white"></lazy-image>
        </v-list-item-avatar>

        <v-textarea
          v-model="post"
          placeholder="What's on your mind..."
          rows="2"
          outlined
          auto-grow
          hide-details></v-textarea>

        <v-btn
          color="primary"
          class="ma-0 ml-4"
          :disabled="isPostEmpty"
          icon
          large
          @click="createPost">
          <v-icon class="pl-1">send</v-icon>
        </v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import LazyImage from '../common/LazyImage.vue';
import PostsService from '../../services/PostsService';

export default {
  components: {
    LazyImage,
  },
  data() {
    return {
      post: '',
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
    isPostEmpty() {
      return this.post.trim().length === 0;
    },
  },
  methods: {
    ...mapMutations({
      addPost: 'posts/addPost',
    }),
    async createPost() {
      this.loading = true;

      try {
        const createdPost = await PostsService.createPost(this.post);
        this.addPost(createdPost);
        this.clearForm();
      } catch (error) {
        this.error = error;
        console.error(error);
      }

      this.loading = false;
    },
    clearForm() {
      this.post = '';
    },
  },
};
</script>
