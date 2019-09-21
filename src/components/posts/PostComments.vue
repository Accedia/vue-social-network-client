<template>
  <div>
    <template v-if="!loading && !error && comments.length > 0">
      <post-card
        v-for="comment in comments"
        :key="comment.id"
        :post="comment"
        :hide-actions="true"
        class="mb-5">
        <template #date :comment="comment">
          <time-ago :datetime="new Date(comment.commented_at)" refresh long tooltip></time-ago>
        </template>
        <template #content :comment="comment">
          <span v-html="comment.comment"></span>
        </template>
      </post-card>
    </template>

    <v-alert
      v-if="!loading && error !== null"
      type="error">
      {{ error }}
    </v-alert>

    <v-alert
      v-if="!loading && !error && comments.length === 0"
      type="info">
      There are no comments for this post yet.
    </v-alert>
  </div>
</template>

<script>
import TimeAgo from 'vue2-timeago';
import PostCommentsService from '../../services/PostCommentsService';
import PostCard from './PostCard.vue';

export default {
  components: {
    PostCard,
    TimeAgo,
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.loadPostComments();
  },
  methods: {
    async loadPostComments() {
      this.loading = true;

      try {
        this.comments = await PostCommentsService.getComments(this.postId);
      } catch (error) {
        console.log(error);
        this.error = error;
      }

      this.loading = false;
    },
  },
};
</script>
