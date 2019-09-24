<template>
  <v-layout>
    <v-row>
      <v-col sm="8" offset-sm="2">
        <post-card
          v-if="canShowPost"
          :post="post"
          :hide-actions="true"
          class="mb-10">
          <template #date :post="post">
            <time-ago :datetime="new Date(post.created_at)" refresh long tooltip></time-ago>
          </template>
          <template #content :post="post">
            <span v-html="post.post"></span>
          </template>
        </post-card>

        <div class="title mb-5 ml-1">Comments</div>

        <post-comments
          v-if="canShowPost"
          :post-id="postId">
        </post-comments>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import TimeAgo from 'vue2-timeago';
import PostsService from '../services/PostsService';
import PostCard from '../components/posts/PostCard.vue';
import PostComments from '../components/posts/PostComments.vue';

export default {
  components: {
    PostComments,
    PostCard,
    TimeAgo,
  },
  data() {
    return {
      postId: null,
      post: null,
      comments: [],
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      loading: 'loader/isLoading',
    }),
    canShowPost() {
      return !this.loading && !this.error && this.post !== null;
    },
  },
  mounted() {
    this.postId = this.$route.params.post_id;
    this.loadPost();
  },
  methods: {
    ...mapMutations({
      showLoader: 'loader/showLoader',
      hideLoader: 'loader/hideLoader',
    }),

    async loadPost() {
      this.showLoader();

      try {
        this.post = await PostsService.getPost(this.postId);
      } catch (error) {
        console.error(error);
        this.error = error;
      }

      this.hideLoader();
    },
  },
};
</script>
