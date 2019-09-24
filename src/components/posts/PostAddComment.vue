<template>
  <v-card :loading="loading">
    <v-card-text class="py-6">
      <v-layout class="align-center">

        <v-textarea
          v-model="comment"
          placeholder="Your comment..."
          rows="2"
          outlined
          auto-grow
          hide-details></v-textarea>

        <v-btn
          color="primary"
          class="ma-0 ml-4"
          :disabled="isCommentEmpty"
          icon
          large
          @click="addComment">
          <v-icon class="pl-1">send</v-icon>
        </v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      comment: '',
    };
  },
  computed: {
    isCommentEmpty() {
      return this.comment.length === 0;
    },
  },
  methods: {
    addComment() {
      this.$emit('submit', this.comment);
      this.resetForm();
    },

    resetForm() {
      this.comment = '';
    },
  },
};
</script>
