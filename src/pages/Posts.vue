<template>
  <v-layout>
    <v-row>
      <v-col sm="12" md="8" offset-lg="1" lg="7">

        <create-post v-if="!anyFiltersApplied" class="mb-10"></create-post>

        <div v-if="!isLoading && !error && posts.length > 0">
          <post-card v-for="post in posts" :key="post.id" :post="post" class="mb-10"></post-card>

          <v-btn
            v-if="morePostsToBeLoaded"
            color="grey lighten-2"
            block
            :loading="loadingMore"
            @click="loadMorePosts">
            Load more
          </v-btn>
        </div>

        <v-alert v-if="!isLoading && error !== null" type="error">
          {{ error }}
        </v-alert>

        <v-alert v-if="!isLoading && !error && posts.length === 0" type="info">
          No posts found
        </v-alert>

      </v-col>
      <v-col sm="12" md="4" lg="3">
        <v-card>
          <v-card-title>
            Filters
          </v-card-title>

          <v-card-text>
            <date-picker @updated="applyDateFilter"></date-picker>
          </v-card-text>

          <v-card-actions v-if="anyFiltersApplied">
            <v-btn
              @click="resetFilters"
              small
              text>Clear all</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import PostsService from '../services/PostsService';
import CreatePost from '../components/posts/CreatePost.vue';
import PostCard from '../components/posts/PostCard.vue';
import DatePicker from '../components/posts/DatePicker.vue';

export default {
  components: {
    CreatePost,
    DatePicker,
    PostCard,
  },
  data() {
    return {
      loadingMore: false,
    };
  },
  computed: {
    ...mapState({
      posts: state => state.posts.posts,
      currentPageNumber: state => state.posts.currentPageNumber,
      postsPerPage: state => state.posts.postsPerPage,
      morePostsToBeLoaded: state => state.posts.morePostsToBeLoaded,
      userId: state => state.posts.userIdFilter,
      dateFilter: state => state.posts.dateFilter,
      error: state => state.posts.error,
    }),
    ...mapGetters({
      isLoading: 'loader/isLoading',
    }),
    anyFiltersApplied() {
      return this.userId !== null || this.dateFilter !== null;
    },
  },
  methods: {
    ...mapMutations({
      setPosts: 'posts/setPosts',
      setMorePostsToBeLoaded: 'posts/setMorePostsToBeLoaded',
      setCurrentPageNumber: 'posts/setCurrentPageNumber',
      setError: 'posts/setError',
      setUserIdFilter: 'posts/setUserIdFilter',
      setDateFilter: 'posts/setDateFilter',
      resetState: 'posts/resetState',
      showLoader: 'loader/showLoader',
      hideLoader: 'loader/hideLoader',
    }),

    async loadPosts() {
      const pageNumber = this.currentPageNumber;
      const perPage = this.postsPerPage;

      try {
        const postsChunk = await PostsService
          .getPosts(pageNumber, perPage, this.userId, this.dateFilter);
        this.setPosts(postsChunk);
        this.setCurrentPageNumber(this.currentPageNumber + 1);
        // Check if there are more posts to be loaded
        if (postsChunk.length < this.postsPerPage) {
          this.setMorePostsToBeLoaded(false);
        }
      } catch (error) {
        console.error(error);
        this.setError(error);
      }
    },

    async loadMorePosts() {
      this.loadingMore = true;

      await this.loadPosts();

      this.loadingMore = false;
    },

    resetFilters() {
      this.resetState();
      this.initialLoad();
    },

    async initialLoad() {
      this.showLoader();

      await this.loadPosts();

      this.hideLoader();
    },

    applyDateFilter() {
      this.resetState(false);
      this.initialLoad();
    },

    setInitialFilters() {
      const userId = this.$route.query.user_id;
      if (userId) {
        this.setUserIdFilter(userId);
      }
      const dateFilter = this.$route.query.date;
      if (dateFilter) {
        this.setDateFilter(dateFilter);
      }
    },
  },
  mounted() {
    this.resetState();
    this.setInitialFilters();
    this.initialLoad();
  },
  beforeDestroy() {
    if (this.isLoading) {
      this.hideLoader();
    }
  },
};
</script>
