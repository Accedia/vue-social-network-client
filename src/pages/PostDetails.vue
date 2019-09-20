<template>
  <div>{{ postId }}</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      postId: null,
      post: null,
      comments: [],
    };
  },
  computed: mapGetters({
    loading: 'loader/isLoading',
  }),
  mounted() {
    this.postId = this.$route.params.post_id;
  },
};
</script>
