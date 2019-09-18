<template>
  <v-container fluid>
    <template v-if="loading">
      <circular-loader color="primary" size="50" class="justify-center"></circular-loader>
    </template>
    <template v-if="!loading">
      <!-- TODO: Extract into a separate component -->
      <v-card
        v-for="post in posts"
        :key="post.id"
        max-width="500"
        class="mx-auto mb-10"
      >
        <v-list-item>
          <v-list-item-avatar v-if="post.author.image">
            <lazy-image :src="post.author.image" width="100%"></lazy-image>
          </v-list-item-avatar>
          <v-list-item-avatar v-if="!post.author.image" color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ post.author.firstname }} {{ post.author.lastname }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <time-ago :datetime="new Date(post.created_at)" refresh long tooltip></time-ago>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <span v-html="post.post"></span>
        </v-card-text>

        <v-card-actions>
          <span class="body-2 grey--text pl-3">
            {{ post.comments_count }} {{ post.comments_count === 1 ? 'Comment' : 'Comments' }}
          </span>
          <div class="flex-grow-1"></div>
          <v-btn
            text
            color="primary"
          >
            Read all
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import TimeAgo from 'vue2-timeago';
import PostsService from '../services/PostsService';
import LazyImage from '../components/common/LazyImage.vue';
import CircularLoader from '../components/common/CircularLoader.vue';

export default {
  components: {
    CircularLoader,
    TimeAgo,
    LazyImage,
  },
  computed: mapState({
    posts: state => state.posts.posts,
    currentPageNumber: state => state.posts.currentPageNumber,
    postsPerPage: state => state.posts.postsPerPage,
    morePostsToBeLoaded: state => state.posts.morePostsToBeLoaded,
    error: state => state.posts.error,
    loading: state => state.posts.loading,
  }),
  methods: {
    ...mapMutations({
      setPosts: 'posts/setPosts',
      resetPosts: 'posts/resetPosts',
      setMorePostsToBeLoaded: 'posts/setMorePostsToBeLoaded',
      setPostPerPage: 'posts/setPostPerPage',
      setError: 'posts/setError',
      setLoading: 'posts/setLoading',
    }),

    async loadPosts(pageNumber, perPage) {
      this.setLoading(true);
      const postsChunk = await PostsService.getPosts(pageNumber, perPage);
      this.setPosts(postsChunk);
      // Check if there are more posts to be loaded
      if (postsChunk.length < perPage) {
        this.setMorePostsToBeLoaded(false);
      }
      this.setLoading(false);
    },
  },
  async mounted() {
    if (this.posts.length > 0) {
      return;
    }

    try {
      await this.loadPosts(this.currentPageNumber, this.postsPerPage);
    } catch (error) {
      console.error(error);
      this.setError(error);
    }
  },
};
</script>
