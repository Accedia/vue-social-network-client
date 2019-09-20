<template>
  <v-card>
    <v-list-item>
      <v-list-item-avatar v-if="post.author.image">
        <lazy-image :src="post.author.image" width="100%"></lazy-image>
      </v-list-item-avatar>
      <v-list-item-avatar v-if="!post.author.image" color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">
          <router-link :to="{ name: 'user-profile', params: { user_id: post.author.id } }">
            {{ post.author.firstname }} {{ post.author.lastname }}
          </router-link>
        </v-list-item-title>
        <v-list-item-subtitle>
          <!-- TODO: Link to the post page -->
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
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        :to="{name: 'post-details', params: { post_id: post.id } }">Read all</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import TimeAgo from 'vue2-timeago';
import LazyImage from '../common/LazyImage.vue';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    TimeAgo,
    LazyImage,
  },
};
</script>
