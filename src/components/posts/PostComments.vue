<template>
  <div>
    <post-add-comment
      v-if="!loading && !error"
      :loading="submittingComment"
      class="mb-5"
      @submit="addComment"></post-add-comment>

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
import PostAddComment from './PostAddComment.vue';

export default {
  components: {
    PostAddComment,
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
      submittingComment: false,
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

    async addComment(text) {
      this.submittingComment = true;

      try {
        const comment = await PostCommentsService.addComment(this.postId, text);
        this.comments.push(comment);
      } catch (error) {
        console.log(error);
      }

      this.submittingComment = false;
    },
  },
};
</script>
