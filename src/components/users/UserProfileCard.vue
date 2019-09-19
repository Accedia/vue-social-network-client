<template>
  <v-card max-width="500" class="mx-auto mb-10">
    <v-list-item>
      <v-list-item-avatar v-if="user.image">
        <lazy-image :src="user.image" width="100%"></lazy-image>
      </v-list-item-avatar>
      <v-list-item-avatar v-if="!user.image" color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ user.firstname }} {{ user.lastname }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-layout>
        <v-icon class="mr-4">contact_mail</v-icon>
        <a :href="`mailto:${user.email}`">{{ user.email }}</a>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :to="{ name: 'posts', query: { user_id: user.id } }"
        color="primary"
        text>
        View posts
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import LazyImage from '../common/LazyImage.vue';

export default {
  components: {
    LazyImage,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
